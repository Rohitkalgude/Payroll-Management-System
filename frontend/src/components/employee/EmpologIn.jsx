import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { toast } from "react-toastify";
import axios from "axios";

function EmpologIn() {
  const [inputVal, setInputVal] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  const hendleData = (e) => {
    if (e.target.name === "Email") {
      setInputVal({ ...inputVal, Email: e.target.value });
    }
    if (e.target.name === "Password") {
      setInputVal({ ...inputVal, Password: e.target.value });
    }
  };
  // console.log(inputVal)
  const GoToHomePage = () => {
    navigate("/");
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        email: inputVal.Email,
        password: inputVal.Password,
      };

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/login`,
        body,
        config
      );
      localStorage.setItem("empData", JSON.stringify(result.data.employee));
      localStorage.setItem("empToken", result.data.token);

      toast.success(result.data.message);

      navigate("/emp/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col  ">
      <div className=" px-10 py-20 border-2 shadow-shadowStyle rounded-2xl bg-divBg ">
        <div className="flex justify-center">
          <VscAccount className="text-5xl" />
        </div>
        <h1 className="text-3xl w-full text-center">Employee LogIn</h1>
        <div className="mt-8 ">
          <form action="" onSubmit={hendleSubmit}>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
                name="Email"
                value={inputVal.Email}
                onChange={hendleData}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password">password: </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
                name="Password"
                onChange={hendleData}
                value={inputVal.Password}
                required
              />
            </div>

            <div className="text-white">
              <button
                className="bg-btnclr p-2 rounded-lg mt-8 w-full hover:bg-blue-800 text-xl"
                type="submit"
              >
                LogIn
              </button>
              <h6
                onClick={GoToHomePage}
                className="mt-5 text-gray-400 hover:text-gray-500 cursor-pointer w-full "
              >
                back to home page?
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpologIn;
