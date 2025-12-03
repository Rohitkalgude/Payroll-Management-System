import React from "react";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddEmployee() {

  const [loading, setLoading] = useState(false);

  const [inputVal, setInputValue] = useState({
    firstName: "",
    email: "",
    password: "",
    dateOfJoining: "",
    jobRole: "",
    salary: "",
    photo: "",
  });

  const hendleData = (e) => {
    switch (e.target.name) {
      case "firstName":
        setInputValue({ ...inputVal, firstName: e.target.value });
        break;

      case "email":
        setInputValue({ ...inputVal, email: e.target.value });
        break;
      case "password":
        setInputValue({ ...inputVal, password: e.target.value });
        break;
      case "joingDate":
        setInputValue({ ...inputVal, dateOfJoining: e.target.value });
        break;
      case "jobRole":
        setInputValue({ ...inputVal, jobRole: e.target.value });
        break;

      case "salary":
        setInputValue({ ...inputVal, salary: e.target.value });
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const hendlesubmit = async (e) => {
    e.preventDefault();
    const date = new Date(inputVal.dateOfJoining);
    const formattedDate = formatDateToString(date);

    // Update state with formatted date
    const updatedInputVal = { ...inputVal, dateOfJoining: formattedDate };

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        name: updatedInputVal.firstName,
        email: updatedInputVal.email,
        password: updatedInputVal.password,
        jobRole: updatedInputVal.jobRole,
        salary: updatedInputVal.salary,
        joinDate: updatedInputVal.dateOfJoining,
        photo: updatedInputVal.photo,
      };

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/create`,
        body,
        config
      );

      toast.success(result.data.message);
      // toast.success("Employee added succesfully")
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  function formatDateToString(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // const postDetails = (pics) => {
  //   // setLoading(true);
  //   // console.log("Received Pics:", pics);
  //   if (pics === undefined) {
  //     toast.error("photo not selected");
  //     return;
  //   }

  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     console.log("in if condition", pics);
  //     const formdata = new FormData();
  //     formdata.append("file", pics);
  //     formdata.append("upload_preset", "chat-app");
  //     formdata.append("cloud_name", "krunalpatil");

  //     // console.log("in if condition formdata", formdata);

  //     axios
  //       .post(
  //         "https://api.cloudinary.com/v1_1/krunalpatil/image/upload",
  //         formdata
  //       )
  //       .then((res) => {
  //         const imageUrl = res.data.url ? res.data.url.toString() : "";
  //         setInputValue((prevState) => {
  //           const updatedState = { ...prevState, photo: imageUrl };
  //           console.log("Updated inputVal:", updatedState);
  //           return updatedState;
  //         });
  //       })
  //       .catch((err) => {
  //         console.error("Error uploading image:", err);
  //       });
  //   } else {
  //     toast.error("Selecte the photo");
  //     return;
  //   }
  // };

  const postDetails = (pics) => {
    if (pics === undefined) {
      toast.error("Photo not selected");
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setLoading(true); // Set loading to true when the upload starts

      const formdata = new FormData();
      formdata.append("file", pics);
      formdata.append("upload_preset", "chat-app");
      formdata.append("cloud_name", "krunalpatil");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/krunalpatil/image/upload",
          formdata
        )
        .then((res) => {
          const imageUrl = res.data.url ? res.data.url.toString() : "";
          setInputValue((prevState) => ({
            ...prevState,
            photo: imageUrl,
          }));
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          toast.error("Error uploading image");
        })
        .finally(() => {
          setLoading(false); // Set loading to false after upload completes
        });
    } else {
      toast.error("Select a valid photo");
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="px-20 py-10 bg-divBg rounded-md shadow-shadowStyle w-9/12 ">
        <div className=" p-8 gap-3 rounded-md bg-sideBgClr shadow-shadowStyle  mb-8 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <VscAccount className="text-5xl " />
          </div>
          <h1 className="text-3xl ">add employee</h1>
        </div>

        <form action="" onSubmit={hendlesubmit}>
          <div className="mt-4">
            <label htmlFor="first-name">first name :</label>
            <input
              type="text"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-2 bg-transparent"
              placeholder="Enter First Name "
              name="firstName"
              value={inputVal.firstName}
              onChange={hendleData}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="">
              email :
            </label>
            <input
              type="email"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="Enter email "
              name="email"
              value={inputVal.email}
              onChange={hendleData}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="">
              set password :
            </label>
            <input
              type="text"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="Enter password"
              name="password"
              value={inputVal.password}
              onChange={hendleData}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="joining-date" className="">
              date of joining :
            </label>
            <input
              type="date"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="Enter joining date"
              name="joingDate"
              value={inputVal.dateOfJoining}
              onChange={hendleData}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="jobe-role" className="">
              job role :
            </label>
            <input
              type="text"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="Enter role"
              name="jobRole"
              value={inputVal.jobRole}
              onChange={hendleData}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="salary" className="">
              salary :
            </label>
            <input
              type="number"
              className=" custom-number-input w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent "
              placeholder="Enter salary"
              name="salary"
              value={inputVal.salary}
              onChange={hendleData}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="salary" className="">
              photo :
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="choose photo"
              name="photo"
              onChange={(e) => postDetails(e.target.files[0])}
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`bg-btnclr p-4 rounded-lg m-1 hover:bg-blue-800 border-2 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Employee"}
            </button>{" "}
            <button
              type="reset"
              className="bg-btnclr p-4 rounded-lg m-1 hover:bg-blue-800 border-2 text-white "
              onClick={()=> setInputValue({
                firstName: "",
                email: "",
                password: "",
                dateOfJoining: "",
                jobRole: "",
                salary: "",
                photo: "",
              })}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
