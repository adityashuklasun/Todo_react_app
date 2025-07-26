import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique IDs

function App() {
const[todo,setTodo] = useState(""); 
const[todos,setTodos] = useState([]);
const[showfinished,setShowfinished] = useState(true);

useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
}, []);
const togglefinishd = ()=>{
setShowfinished(!showfinished);
}
  const handleedit = (id) => {
  
    let t = todos.filter(item => item.id === id);
    if (t.length > 0) {
      setTodo(t[0].todo);
    }
     const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
 
   
  }
 
  const handleadd = () => {
    if (todo.length < 3) {
      alert("Please enter at least 3 characters for your todo.");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const SaveTLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleCheckbox = (e) => {
    const updatedTodos = todos.map(item => {
      if (item.id === e.target.name) {
        return { ...item, iscompleted: e.target.checked };
      }
      return item;
    });
    setTodos(updatedTodos);
  }
const handleDelete = (e,id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    SaveTLS();
  }
  return (
    <>
      <Navbar />
      <div className="container bg-green-200  mx-auto my-5 p-5 rounded-lg shadow-lg w-[80%] md:w-[60%] ">


        <div className="todos">
          <div><label className='text-xl font-semibold '>Add Todo</label></div>
          <div className="add_todo flex gap-2 items-center justify-start my-1 ">
            <input onChange = {handleChange} value = {todo}  type="text" className='w-96 rounded-md' />
            <button  onClick = {handleadd}  className='border bg-green-500 rounded-lg px-5 mx-5 hover:bg-green-400 '  disabled= {todo.length<3} >save </button>
            
          </div>

          
          <input onChange={togglefinishd} type="checkbox" checked = {showfinished} />Show Finished
          <hr />
          <div className='h-[1.5px] w-full bg-gray-700 my-2  rounded-lg'></div>
          <h1 className='text-xl font-bold my-3'>Your Todos</h1>
          <div className="todo my-3">
            {todos.length === 0 && <p className='text-black font-bold' >All set and done</p>}
          {todos.map(item=>
          {
            return (
            
             (showfinished || !item.iscompleted) && <div key={item.id} className="todo_item flex items-center gap-4 justify-between my-2 ">
                <div className='flex gap-5'> <input onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} name={item.id} id="" />
                <span className={item.iscompleted ? "line-through" : ""}>{item.todo} </span></div>
               
                <div className='flex gap-2'>
                  <button onClick={() => handleedit(item.id)} className='bg-green-500 rounded-lg px-2 py-1'><FaEdit/></button>
                  <button onClick={(e) => {handleDelete(e,item.id)}} className='bg-green-500 rounded-lg px-2 py-1'><FaTrash/></button>
                </div>
              </div>
            )
          })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
