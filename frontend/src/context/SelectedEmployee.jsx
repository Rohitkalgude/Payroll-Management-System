import { createContext, useContext } from "react";

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export default EmployeeContext;
