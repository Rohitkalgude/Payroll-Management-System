import React, { useContext } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo";
import AdminContext from "../../context/AdminContext";

function Sidebar() {
  const menuItems = [
    {
      icon: <FaPeopleGroup className="inline text-3xl m-3" />,
      title: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <IoPersonAdd className="inline text-2xl m-3" />,
      title: "add employee",
      path: "addemployee",
    },
    {
      icon: <MdManageAccounts className="inline text-3xl m-3" />,
      title: "manage leave",
      path: "manageleave",
    },
  ];

  
  const { admin } = useContext(AdminContext);

  const profileImg =
    "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg";

    const hendleLogOut = ()=>{
      localStorage.clear()
    }


  return (
    <div
      className={`h-screen bg-sideBgClr text-gray-400 p-5 pt-8 w-64
} duration-500 fixed flex items-center flex-col border-2`}
    >
      <div className="mb-8 flex  justify-center   w-full text-center">
        <Logo className="w-56 h-auto" />
      </div>
      <div className="mt-4">
        <img
          src={profileImg}
          alt="no image available"
          className="rounded-full min-h-10 max-h-20 cursor-pointer"
        />
      </div>
      <h1 className="mt-2">{admin && admin.name}</h1>
      <h3 className="lowercase">{admin && admin.email}</h3>

      <ul className="mt-10 w-full font-semibold list-none p-0">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="w-full flex flex-col  cursor-pointer my-3 rounded-lg"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block w-full ${
                  isActive
                    ? "bg-btnclr text-white rounded-lg"
                    : "hover:bg-blue-100 rounded-lg "
                }`
              }
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2 ">{item.title}</span>
              </div>
            </NavLink>
          </li>
        ))}
        <li className="w-full cursor-pointer m-1 mt-32 hover:bg-blue-100  rounded-lg">
          <NavLink to="/adminLogin">
            <div className="flex items-center " onClick={hendleLogOut}>
              <IoMdLogOut className="inline text-3xl m-3 " /> Logout
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
