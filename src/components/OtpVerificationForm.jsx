import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function OtpVerificatoinForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const userData = location.state

  const [formData, setFormData] = useState({
    otp: ""
  })

  function changeHandler(event) {
    setFormData( (preData) => ({
      ...preData,
      [event.target.name] : event.target.value,
    }))
  }

  async function submitHandler(event) {
    try {
      event.preventDefault();

      //api call later
      const res = await axios.post('https://my-todo-app-backend-bngt.onrender.com/api/v1/user/signup', {...userData, ...formData})

      if (res.data.success) {
        alert('successfully created user.')
        navigate('/login')
      } else {
        console.log(res)
        alert('something went wrong try again.')
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="h-full p-5 w-[33%] bg-gray-50 rounded-xl flex justify-center items-center">
      <div className="w-[90%] h-[85%] flex flex-col gap-10">
        {/* Header Part */}
        <div className="w-full h-[20%] flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-blue-950 text-center">
            Confirm OTP
          </h1>
          <h2 className="text-xs font-semibold text-gray-400 text-center">
            We sent you via mail
          </h2>
        </div>

        <div className="w-full h-[80%]">
          {/* Form Main Part */}
          <div className="w-full h-[90%]">
            <form onSubmit={submitHandler} className="w-full flex flex-col gap-7 items-center">
              <div className="w-full flex flex-col items-center gap-8">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-8/9 py-2 text-blue-950 text-md outline-none border-b-2 border-gray-500"
                  value={formData.otp}
                  name="otp"
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
          <div className="w-full h-[10%] flex flex-col gap-2 py-2">
            <div className="text-center text-sm hover:text-blue-500 underline cursor-pointer">
              Resend
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerificatoinForm;