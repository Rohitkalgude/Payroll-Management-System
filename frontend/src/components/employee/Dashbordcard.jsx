import React from "react";

function Dashbordcard(props) {
  return (
    <div className="bg-divBg rounded-md shadow-shadowStyle shadow-gray-300 py-8 pr-44 pl-5">
      <div className="flex flex-col gap-5">
      <div>
        {props.headicon}
      </div>
      <div>
        <div className="text-gray-400 font-serif ">{props.value}</div>
        <div className="text-xl">
          <span>
            {props.icon}
          </span>
          <span>{props.data}</span>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Dashbordcard;
