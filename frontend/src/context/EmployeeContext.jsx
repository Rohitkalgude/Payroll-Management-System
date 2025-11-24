import React, { createContext, useState, useEffect } from "react";

const EmpContext = createContext(null);

export const EmpProvider = ({ children }) => {
  const [emp, setEmp] = useState();

  useEffect(() => {
    // Load emp data from local storage
    const storedempData = localStorage.getItem("empData");
    if (storedempData) {
      setEmp(JSON.parse(storedempData));
    }
  }, []);

  const value = {
    emp,
    setEmp,
  };

  return <EmpContext.Provider value={value}>{children}</EmpContext.Provider>;
};

export default EmpContext;
