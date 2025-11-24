import React from "react";

export default function Btn(props) {
  return (
    <button
      className="bg-btnclr font-Inter font-semibold p-3 rounded-lg m-1 hover:bg-blue-800 text-white "
      onClick={props.onClick}
      type={props.type}
    >
      {props.value}
    </button>
  );
}
