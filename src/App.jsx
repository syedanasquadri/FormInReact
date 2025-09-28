import { useState } from "react";

const App = () => {
    const [form, setform] = useState({name:"", age:"" ,course:""});
    const [leads, setleads] = useState([]);
    const handleChange = (e) =>{
        setform({...form, [e.target.name] : e.target.value});
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        setleads([...leads,form]);
        setform({name: "", age: "", course: ""});
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label><br />
            <input type="text" name="name" onChange={handleChange} value={form.name}/><br />
            <label htmlFor="">Age</label><br />
            <input type="text" name="age" onChange={handleChange}
            value={form.age}/><br />
            <label htmlFor="">Course</label><br />
            <input type="text" name="course" onChange={handleChange}
            value={form.course}/><br />
            <button type="submit">Submit</button>
            <h3>Leads</h3>            
        </form>
         <ul>
         {/* {leads.map((leads,index) => <li key={index}>{leads.name} - {leads.age} - {leads.course}</li>)} */}
         {leads.map((lead,index) => <li key={index}>{lead.name} - {lead.age} - {lead.course}</li>)}
        </ul>
    </div>
}

export default App