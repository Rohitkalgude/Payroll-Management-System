import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { GrStatusInfo } from "react-icons/gr";
import { IoIosListBox } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import Logo from "../../assets/Logo";
import EmpContext from "../../context/EmployeeContext";
import { useContext } from "react";

function Sidebar() {
  const menuItems = [
    {
      icon: <TbLayoutDashboardFilled className="inline text-3xl m-3" />,
      title: "Dashboard",
      path: "/emp/dashboard",
    },
    {
      icon: <FaBuildingCircleArrowRight className="inline text-3xl m-3" />,
      title: "apply leave",
      path: "/emp/leave",
    },
    {
      icon: <GrStatusInfo className="inline text-3xl m-3 " />,
      title: "leave status",
      path: "/emp/leavestatus",
    },
    {
      icon: <IoIosListBox className="inline text-3xl m-3" />,
      title: "salary slip",
      path: "/emp/salaryslip",
    },
  ];

  const profileImg =
    "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg";

  const { emp } = useContext(EmpContext);
  const hendleLogOut = () => {
    localStorage.clear();
  };

  return (
    <div
      className={`h-screen bg-sideBgClr  text-gray-400 p-5 pt-8 w-64 duration-500 fixed flex items-center flex-col border-2`}
    >
      <div className="mb-8 flex items-center justify-center   w-full text-center">
        <Logo className="w-56 h-auto" />
      </div>
      <div className="mt-4">
        <img
          src={emp ? emp.photo : profileImg}
          alt={emp && emp.name}
          className="rounded-full min-h-10 max-h-20 cursor-pointer"
        />
      </div>
      <h1 className="mt-2">{emp && emp.name}</h1>
      <h3 className="lowercase">{emp && emp.email}</h3>

      <ul className="mt-10 w-full font-semibold list-none p-0">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="w-full cursor-pointer hover:bg-blue-100 my-2 rounded-lg"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block w-full ${
                  isActive ? "bg-btnclr text-white rounded-lg" : " rounded-lg "
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
        <li className="w-full cursor-pointer m-1 hover:bg-blue-100 rounded-lg mt-20">
          <NavLink to="/empLogin">
            <div className="flex items-center" onClick={hendleLogOut}>
              <IoMdLogOut className="inline text-3xl m-3  " /> Logout
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;




