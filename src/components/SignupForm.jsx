import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignupForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPass: "",
  })

  function changeHandler(event) {
    setFormData( (preData) => ({
      ...preData,
      //[] part of syntax
      [event.target.name] : event.target.value,
    }))
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      //api call
      const res = await axios.post('http://localhost:4000/api/v1/user/otp', formData)
      
      if (res.data.success) {
        navigate('/otp-verification', {state: formData})
      }
      else {
        console.log(res)
        alert('something went wrong please try again')
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="h-full p-5 w-[33%] bg-gray-50 rounded-xl flex justify-center items-center">
      <div className="w-[90%] h-[85%] flex flex-col gap-4">
        {/* Header Part */}
        <div className="w-full h-[20%]">
          <h1 className="text-3xl font-bold text-blue-950 text-center">
            Signup
          </h1>
        </div>

        <div className="w-full h-[80%] flex flex-col gap-3">
          {/* Form Main Part */}
          <div className="w-full h-[80%] ">
            <form onSubmit={submitHandler} className="w-full flex flex-col gap-15 items-center">
              <div className="w-full flex flex-col items-center gap-8">

                <input
                  type="text"
                  placeholder="Name"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.name}
                  name="name"
                  onChange={changeHandler}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.email}
                  name="email"
                  onChange={changeHandler}
                  required
                />

                <input
                  type="address"
                  placeholder="Address"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.address}
                  name="address"
                  onChange={changeHandler}
                />

                <input
                  type="phone"
                  placeholder="Phone"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.phone}
                  name="phone"
                  onChange={changeHandler}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.password}
                  name="password"
                  onChange={changeHandler}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.confirmPass}
                  name="confirmPass"
                  onChange={changeHandler}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                placeholder="Create Account"
                className="w-8/9 py-2 cursor-pointer rounded-md bg-blue-950 text-white text-md font-semibold text-center"
              />
            </form>
          </div>

          {/* Form Bottom Part */}
          <div className="w-full h-[20%] flex flex-col py-2 gap-2">
            <div className="text-center text-sm">
              Do you have an account?&nbsp;
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
