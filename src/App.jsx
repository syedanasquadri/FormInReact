import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    level: "",
  });
  const [leads, setLeads] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");


const [searchQuery, setSearchQuery] = useState("");
const filteredLeads =leads.filter((lead) => (lead.name.toLowerCase().includes(searchQuery.toLowerCase())))


  // Load leads from local "db.json" via json-server
  useEffect(() => {
    fetch("http://localhost:5000/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.course || !form.level) {
      alert("Fill all the fields.");
      return;
    }
    //saving data in db.json
    fetch("http://localhost:5000/leads", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newLeads) => setLeads([...leads, newLeads]));

    setForm({ name: "", age: "", course: "", level: "" });
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/leads">View Leads</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
                <br />

                <label>Age</label>
                <br />
                <input
                  type="text"
                  name="age"
                  onChange={handleChange}
                  value={form.age}
                />
                <br />

                <label>Course</label>
                <br />
                <input
                  type="text"
                  name="course"
                  onChange={handleChange}
                  value={form.course}
                />
                <br />

                <label>Level</label>
                <br />
                <select name="level" onChange={handleChange} value={form.level}>
                  <option value="">-- Select --</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Pro">Pro</option>
                </select>
                <br />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
          }
        />
        <Route
          path="/leads"
          element={
            <div>
              <h3>leads</h3>
              <input
               type="text"
               placeholder="Search by name..."
               value={searchQuery}
               onChange={(e) => {setSearchQuery(e.target.value)}}
                />
                <ul>
                  {filteredLeads.map((lead) => (
                    <li>
                    {lead.name}-{lead.age}-{lead.course}-{leads.level}
                  </li>
                ))}
                </ul>

              <ul>
                {leads.map((lead) => (
                  <li key={lead.id}>
                    {lead.name} - {lead.age} - {lead.course} - {lead.level}
                  </li>
                ))}
              </ul>

            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
