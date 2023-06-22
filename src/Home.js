import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const nav = useNavigate();
    const [info, setInfo] = useState([]);

    useEffect(() => {
        let urladd = "https://smsapp-22june23-2o6c32ee2-vishal-gori.vercel.app/getdata";
        axios.get(urladd)
            .then(res => {
                setInfo(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const delStu = (rno) => {
        let urladd = "https://smsapp-22june23-2o6c32ee2-vishal-gori.vercel.app/remove";
        let d = { data: { rno } }
        axios.delete(urladd, d)
            .then(res => {
                alert("record deleted");
                window.location.reload();
            })
            .catch(err => alert("Delete Issue " + err));
    }

    const updateStu = (rno, name, marks) => {
        nav("/update", {state: {r:rno, n:name, m:marks}})
    }

    return (
        <>
            <center>
                <h1>Home Page</h1>
                <table >
                    <tr>
                        <th>Rno</th>
                        <th>Name</th>
                        <th>Marks</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    {
                        info.map((e) => (
                            <tr style={{ "text-align": "center" }}>
                                <td>{e.rno}</td>
                                <td>{e.name}</td>
                                <td>{e.marks}</td>
                                <td><button className="del" onClick={() => {
                                    if(window.confirm("Are you sure??"))delStu(e.rno)
                                }}>Delete</button></td>
                                <td><button className="upd" onClick={() => {
                                    updateStu(e.rno, e.name, e.marks);
                                }}>Update</button></td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </>
    );
}