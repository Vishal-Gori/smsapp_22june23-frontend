import {useState} from "react";
import axios from "axios";

export default function Create(){

    const [rno, setRno] = useState("");
    const [name, setName] = useState("");
    const [marks, setMarks] = useState("");
    const [ans, setAns] = useState("");

    const hRno = (event) => {setRno(event.target.value);}
    const hName = (event) => {setName(event.target.value);}
    const hMarks = (event) => {setMarks(event.target.value);}
    
    const save = (event)=>{
        event.preventDefault();
        let data = {rno, name, marks};
        let urladd = "https://smsapp-22june23-2o6c32ee2-vishal-gori.vercel.app/save";
        axios.post(urladd, data)
        .then(res => {
                setAns("Record Created");
                setRno("");
                setName("");
                setMarks("");
        })
        .catch(err => {
            setAns("RollNo. "+rno+" already exists");
            setRno("");
        })
    }

    return(
        <>
        <center>
            <h1>Create Page</h1> 
            <form onSubmit={save}>
                <input type="number" placeholder="Enter Your Rno" onChange={hRno} value={rno}/>
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