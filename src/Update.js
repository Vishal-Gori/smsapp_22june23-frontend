import {useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Update(){

    const loc = useLocation();

    const [rno, setRno] = useState("");
    const [name, setName] = useState("");
    const [marks, setMarks] = useState("");
    const [ans, setAns] = useState("");

    const hRno = (event) => {setRno(event.target.value);}
    const hName = (event) => {setName(event.target.value);}
    const hMarks = (event) => {setMarks(event.target.value);}

    useEffect(() => {
        setRno(loc.state.r);
        setName(loc.state.n);
        setMarks(loc.state.m);
    },[])
    
    const save = (event)=>{
        event.preventDefault();
        let data = {rno, name, marks};
        let urladd = "https://smsapp-22june23-2o6c32ee2-vishal-gori.vercel.app/modify";
        axios.put(urladd, data)
        .then(res => {
            if(res.data.affectedRows === 1){
                setAns("Record Updated");
                setRno("");
                setName("");
                setMarks("");
            }
        })
    }

    return(
        <>
        <center>
            <h1>Update Page</h1> 
            <form onSubmit={save}>
                <input type="number" placeholder="Enter Your Rno" onChange={hRno} value={rno} disabled={true}/>
                <br/><br/>
                <input type="text" placeholder="Enter Your Name" onChange={hName} value={name}/>
                <br/><br/>
                <input type="number" placeholder="Enter Marks" onChange={hMarks} value={marks}/>
                <br/><br/>
                <input type="submit" value="Save"/>
            </form>
            <h1>{ans}</h1>
        </center>
        </>
    );
}