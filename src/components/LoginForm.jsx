import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from '../contexts/auth'
import axios from "axios";

function LoginForm() {
  const {isLoggedIn, setIsLoggedIn, user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  function changeHandler(event) {
    setFormData( (preData) => ({
      ...preData,
      [event.target.name] : event.target.value,
    }) );
  }

  async function submitHandler(event) {
    try {
      event.preventDefault();

      //api call later
      const res = await axios.post('https://my-todo-app-backend-bngt.onrender.com/api/v1/user/login', formData, {withCredentials: true})

      if (res.data.success) {
        setIsLoggedIn(true)
        setUser(res.data)
        navigate('/')
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="h-full w-[33%] p-5 bg-gray-50 rounded-xl flex justify-center items-center">
      <div className="w-[90%] h-[85%]">
        {/* Header Part */}
        <div className="w-full h-[20%]">
          <h1 className="text-4xl font-bold text-blue-950 text-center">
            Login
          </h1>
        </div>

        <div className="w-full h-[80%]">
          {/* Form Main Part */}
          <div className="w-full h-[80%]">
            <form onSubmit={submitHandler} className="w-full flex flex-col gap-15 items-center">
              <div className="w-full flex flex-col items-center gap-8">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.email}
                  onChange={changeHandler}
                  required
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.password}
                  onChange={changeHandler}
                  required
                />
              </div>
              <input
                type="submit"
                placeholder="Submit"
                value="Submit"
                className="w-8/9 py-2 cursor-pointer rounded-md bg-blue-950 text-white text-md font-semibold text-center"
              />
            </form>
          </div>

          {/* Form Bottom Part */}
          <div className="w-full h-[20%] flex flex-col py-2 gap-2">
            <div className="text-center text-sm">
              Forget{" "}
              <span>
                <a href="#" className="text-blue-500">
                  Password?
                </a>
              </span>
            </div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
