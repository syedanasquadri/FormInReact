import { useState } from "react"
const App = () => {
  const [InputVal, setInputVal] = useState("");
  const [name,setname] = useState("");
  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setname(InputVal)
  }

  console.log(InputVal);
  return <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Name</label><br />
      <input type="text" onChange={handleChange}/><br />
      <button >submit</button>
    </form>
    <ul>{name}</ul>
  </div>
}
export default App