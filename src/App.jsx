import { useState, useEffect } from "react";

const App = () => {
  const [form, setForm] = useState({ name: "", age: "", course: "", level: "" });
  const [leads, setLeads] = useState([]);

  // Load leads from local "db.json" via json-server
  useEffect(() => {
    fetch("http://localhost:5000/leads")//gives or returns http response of the string it has
      .then((res) => res.json())//res.json converts that string into a js object, and returns that js object 
      .then((data) => setLeads(data)); //data contains the js object, leads is updated with the data
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name || !form.age || !form.course || !form.level){
        alert("Fill all the fields.")
        return;
    }
    //saving data in db.json
    fetch("http://localhost:5000/leads", {
        method: "Post",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form),
    })
    .then((res) => res.json())
    .then((newLeads) => setLeads([...leads, newLeads]))

    setForm({name: "", age: "", course: "", level: ""})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label><br />
        <input type="text" name="name" onChange={handleChange} value={form.name} /><br />

        <label>Age</label><br />
        <input type="text" name="age" onChange={handleChange} value={form.age} /><br />

        <label>Course</label><br />
        <input type="text" name="course" onChange={handleChange} value={form.course} /><br />

        <label>Level</label><br />
        <select name="level" onChange={handleChange} value={form.level}>
          <option value="">-- Select --</option>
          <option value="Beginner">Beginner</option>
          <option value="Pro">Pro</option>
        </select><br /><br />

        <button type="submit">Submit</button>
        <h3>Leads</h3>
      </form>

      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.name} - {lead.age} - {lead.course} - {lead.level}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
