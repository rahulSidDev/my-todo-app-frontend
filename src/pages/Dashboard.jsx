import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/auth'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const {isLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const [todos, setTodos] = useState([])
  const [editState, setEditState] = useState(null)
  const [editedTodo, setEditedTodo] = useState({
    title: "",
    description: ""
  })
  const [newtodo, setNewtodo] = useState({
    title: "",
    description: ""
  })

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://my-todo-app-backend-bngt.onrender.com/api/v1/getAllTodos', {withCredentials: true})
      setTodos(res.data.data)
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const newtodoCreateHandler = async (e) => {
    e.preventDefault()

    try {
      const payload = {title: newtodo.title, description: newtodo.description}
      const res = await axios.post("https://my-todo-app-backend-bngt.onrender.com/api/v1/createTodo", payload, {withCredentials:true});
      fetchTodos();

      setNewtodo({title: "", description: ""})
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const rest = await axios.delete(`https://my-todo-app-backend-bngt.onrender.com/api/v1/deleteTodo/${id}`, {withCredentials: true})
      fetchTodos()
    }
    catch (e) {
      console.log(e.message)
    }
  }

  const handleEditingTodo = async (id) => {
    try {
      const res = await axios.put(`https://my-todo-app-backend-bngt.onrender.com/api/v1/updateTodo/${id}`, editedTodo, {withCredentials: true})
      setEditState(null)
      setEditedTodo({
        title: "",
        description: ""
      })
      fetchTodos()
    }
    catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center bg-slate-100'>
      
      {/* main container */}
      <div className='h-full w-[33%] p-5 bg-gray-50 rounded-xl flex flex-col items-center'>
        <div className="w-full h-[20%]">
          <h1 className="text-4xl font-bold text-blue-950 text-center">
            Todo List
          </h1>
        </div>

        <div className='w-full h-[20%]'>
          <div className='w-full h-[20%]'>
            <form onSubmit={newtodoCreateHandler} className='w-full flex flex-col py-2 gap-5 items-center'>
              <div className="w-full flex flex-col items-center gap-5">
                <input 
                  className='w-8/9 text-blue-950 text-md outline-none border-b-2 border-gray-500'
                  type='text' 
                  value={newtodo.title} 
                  name='title'
                  onChange={(e) => setNewtodo({...newtodo, title: e.target.value})}
                  placeholder='Enter title'
                />

                <input 
                  className='w-8/9 text-blue-950 text-md outline-none border-b-2 border-gray-500'
                  type='text' 
                  value={newtodo.description} 
                  name='description'
                  onChange={(e) => setNewtodo({...newtodo, description: e.target.value})}
                  placeholder='Enter description'
                />
              </div>

              <input 
                type='submit'
                className='w-8/9 py-2 cursor-pointer rounded-md bg-blue-950 text-white text-md font-semibold text-center'
                placeholder='Create Todo'
                value='Create Todo'
              />

            </form>
          </div>
        </div>

        {/* main todo table */}
        <table className='w-full border-separate border-spacing-y-5 border-spacing-x-5'>
          <thead></thead>
          <tbody>
          {
            todos.map(todo => {
              return (
                <tr key={todo._id} className='text-left'>
                  {editState === todo._id ? (
                    <>
                      <td className='gap-5'>
                        <input 
                          className='w-8/9 text-blue-950 text-md outline-none border-b-2 border-gray-500'
                          type='text' 
                          value={editedTodo.title} 
                          name='title'
                          onChange={(e) => setEditedTodo({...editedTodo, title: e.target.value})}
                          placeholder='Enter New Title'
                        />
                        <input 
                          className='w-8/9 text-blue-950 text-md outline-none border-b-2 border-gray-500'
                          type='text' 
                          value={editedTodo.description} 
                          name='description'
                          onChange={(e) => setEditedTodo({...editedTodo, description: e.target.value})}
                          placeholder='Enter New Description'
                        />
                      </td>
                      <td className='flex gap-5 py-1'>
                        <button onClick={() => setEditState(null)} className='px-3 py-1 rounded-sm bg-gray-100 text-gray-800 cursor-pointer'>Cancel</button>
                        <button onClick={() => handleEditingTodo(todo._id)} className='px-3 py-1 rounded-sm bg-green-500 text-gray-800 cursor-pointer'>Save</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className='gap-5'>
                        <span className='text-base font-bold text-slate-800'>{todo.title}</span> <br/>
                        <span className='text-sm text-slate-800'>{todo.description}</span>
                      </td>
                      <td className='flex gap-5 py-1'>
                        <button onClick={() => deleteTodo(todo._id)} className='px-3 py-1 rounded-sm bg-red-500 text-gray-800 cursor-pointer'>Delete</button>
                        <button 
                          onClick={() => {
                            setEditState(todo._id); 
                            setEditedTodo({title: todo.title, description: todo.description})
                          }} 
                          className='px-3 py-1 rounded-sm bg-yellow-500 text-gray-800 cursor-pointer'
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard