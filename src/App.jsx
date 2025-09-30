import { useState,useEffect } from "react";

const App = () => {
    const [form, setform] = useState({name: "", age: "" , course: "", level: ""});
    const [leads, setleads] = useState([]);


  useEffect(() => {
    localStorage.setItem("leads",JSON.stringify(leads))
  },[leads])


    const handleChange = (e) =>{
        setform({...form, [e.target.name] : e.target.value});
    }
     
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.name || !form.age || !form.course || !form.level){
            alert("Fill all the fields")
            return;
        }
        setleads([...leads,form]);
        setform({name: "", age: "", course: "" ,level: ""});
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

            <label htmlFor="">
               <select name="level" onChange={handleChange} value={form.level}>
                <option value="">--Select--</option>
                 <option value="Beginner">Beginner</option>
                 <option value="Pro">Pro</option>
               </select>
            </label>

            <button type="submit">Submit</button>
            <h3>Leads</h3>            
        </form>
         <ul>
         {leads.map((lead,index) => <li key={index}>{lead.name} - {lead.age} - {lead.course} - {lead.level} </li>)}
        </ul>
    </div>
}

export default App
