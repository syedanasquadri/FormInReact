import { useState } from "react"
const App = () => {
  const [InputVal, setInputVal] = useState("");

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const handleSubmit = () => {
    
  }

  console.log(InputVal)
  return <div>
    <form action="">
      <label htmlFor="">Name</label><br />
      <input type="text" onChange={handleChange}/><br />
      <label htmlFor="">Age</label><br />
      <input type="text" onChange={handleChange}/><br />
      <label htmlFor="">Gender</label><br />
      <input type="text" onChange={handleChange}/><br />
      <button type="submit">Submit</button>
    </form>
    
  </div>
}
export default App