import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    level: "",
    createdAt: new Date().toLocaleString(),
  });
  const [leads, setLeads] = useState([]);

  const [theme, setTheme] = useState(() => {
   return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className= theme;
    localStorage.setItem("theme", theme);
  },[theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  };

       
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [sortOrder, setSortOrder] = useState("latest");
  
   const toggleSortOrder = () => { // 🟩 New function
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };


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

    setForm({ name: "", age: "", course: "", level: "", createdAt: new Date().toLocaleString() });
  };

    const sortedLeads = [...filteredLeads].sort((a, b) => { // 🟩 Sorting logic
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/">Home</Link> | <Link to="/leads">View Leads</Link>
        <button onClick={toggleTheme} style={styles.toggleBtn}>{theme === "light" ? "Dark Mode" : "Light Mode"}</button>
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <ul>
                {filteredLeads.map((lead) => (
                  <li key={lead.id}>
                    {lead.name}-{lead.age}-{lead.course}-{lead.level}- 
                  {lead.createdAt}
                  </li>
                ))}
              </ul>
              <br />
              <br />
              <br />
      <button onClick={toggleSortOrder}>
        Sort by: {sortOrder === "latest" ? "Latest" : "Oldest"}
      </button>
      <ul>
        {sortedLeads.map((lead) => (
          <li key={lead.id}>
            {lead.name} - {lead.age} - {lead.course} - {lead.level} -{" "}
            {lead.createdAt}
          </li>
        ))}
      </ul>
              <ul>
                {leads.map((lead) => (
                  <li key={lead.id}>
                    {lead.name} - {lead.age} - {lead.course} - {lead.level} -{" "}
                    {lead.createdAt}
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

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid gray",
  },
  toggleBtn: {
    padding: "6px 10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};
