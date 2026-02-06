  import { useEffect, useState } from 'react'
  import Navbar from './components/navbar'
  import { v4 as uuidv4 } from 'uuid';
  import { MdEdit } from "react-icons/md";
  import { MdDeleteOutline } from "react-icons/md";



  function App() {
    const [todo, settodo] = useState("")
    const [todos, settodos] = useState([])
    const [editId, setEditId] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      settodos(JSON.parse(savedTodos))
    }
    setLoaded(true)
  }, [])


  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos, loaded])
    
  const finishedtodos = (params) => {
    setshowfinished(!showfinished)
  }


  const handleadd = () => {
    // if(!todo.trim()) return;
    if (editId) {
      const newtodos = todos.map(item =>
        item.id === editId
          ? { ...item, todo }
          : item
      );
      settodos(newtodos);
      setEditId("");
    } else {
      settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    }
    settodo("");

  };
  const handleedit = (id) => {
    const t = todos.find(item => item.id === id);
    settodo(t.todo);
    setEditId(id);

  };

    const handlechange = (e) => {
      settodo(e.target.value)
    }
  const handledelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this todo?");
    if (!ok) return;

    const newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos);

  };
    const handlecheckbox = (e) => {
      let id = e.target.name
      let index = todos.findIndex(item => (item.id === id))
      let newtodos = [...todos];
      newtodos[index].iscompleted = !newtodos[index].iscompleted;
      settodos(newtodos)


    }


    return (
      <>
        <Navbar />
 <div className="max-w-2xl mx-3 md:mx-auto md:px-6 px-3 py-5 mt-6 rounded-xl bg-violet-100 min-h-[80vh]">



        <h1 className='font-bold text-violet-700 text-center text-xl'>Day Tracker - Change Your Life Goals</h1>
          <div className="addtodo my-6 flex flex-col gap-3">
            <h2 className='text-lg font-bold text-purple-700 text-shadow-2xs shadow-fuchsia-900'>Add Todos</h2>

            <input onChange={handlechange} value={todo} className='textbox bg-white w-full rounded-full px-5 py-1 ' type="text" placeholder='Add Your Todo Here ' />
            <button onClick={handleadd} disabled={todo.length<=3}  className='bg-violet-800 hover:bg-violet-950 disabled:bg-indigo-900 text-sm px-3 py-1 rounded-md  font-bold text-white cursor-pointer'>{editId ? "Save" : "Add"}</button>

          </div>




         
         <label className="flex items-center my-5 gap-3 font-bold text-lg cursor-pointer ">

          <input onChange={finishedtodos} type="checkbox" checked={showfinished} className='font-bold' /> Show Finished
         </label>
         <div className='h-px bg-black opacity-35 w-3/4 mx-auto'></div>
       
                <h2 className="text-lg font-bold  text-purple-700 text-shadow-2xs shadow-fuchsia-900">My Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='font-bold text-green-600 text-lg text-shadow-purple-800 text-shadow-xs my-4'>No ToDo's To Display</div>}
            {todos.map(item => {
              return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex flex-col sm:flex-row w-full my-3 gap-2 sm:justify-between">
                <div className='flex gap-5'>

                  <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} id="" />
                  <div id='text' className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button  onClick={() => handleedit(item.id)} className='bg-violet-800 hover:bg-violet-950 text-sm px-3 py-1 rounded-md mx-1 cursor-pointer font-bold text-white'><MdEdit /></button>
                  <button onClick={() => handledelete(item.id)} className='bg-violet-800 hover:bg-violet-950 text-sm px-3 py-1 rounded-md mx-1 cursor-pointer font-bold text-white'><MdDeleteOutline /></button>
                </div>
              </div>
            }
            )}

          </div>

        </div>
      </>
    )
  }

  export default App
