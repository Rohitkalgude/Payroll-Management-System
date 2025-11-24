
import { useEmployeeContext } from "../../context/SelectedEmployee";


function EmpProfile() {
  const { selectedEmployee } = useEmployeeContext();
  
  return (
    <div className="p-10 flex items-center justify-center ">
      <div className="flex items-center p-4 border-b-2">
        <div className="p-2">
          <img src={selectedEmployee.photo} className="aspect-auto mr-3 max-w-20 " />
        </div>
        <div className="text-2xl">
          <h1>{selectedEmployee.name}</h1>
          <h6 className="text-sm text-gray-500">{selectedEmployee.jobRole}</h6>
          <h6 className="text-sm text-gray-500 lowercase">
            {selectedEmployee.email}
          </h6>
          <h6 className="text-sm text-gray-500">
            Rs.{selectedEmployee.salary}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default EmpProfile;
