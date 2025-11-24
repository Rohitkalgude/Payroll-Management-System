import React from "react";
import Btn from "./Btn";
import { useNavigate } from "react-router-dom";
import bgLogo from "../assets/LogoWeb.jpg";

function Landingpage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogo})` }}
    >
      <div className="mt-80 mx-40">
        <h1 className="text-blue-900 mb-2 text-2xl text-center max-w-lg">
          Simplify Payroll Processing with Our Efficient Solutions!
        </h1>
        <div className="px-16">
          <Btn value="Employee LogIn" onClick={() => navigate("empLogin")} />
          <Btn value="Admin LogIn" onClick={() => navigate("adminLogin")} />
          <Btn value="About Us" onClick={() => navigate("AboutUs")} />
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
