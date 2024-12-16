import { generateRandomData } from "../../api/apiEmployee";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";

const EmployeeTablePage = () => {
  const employee = generateRandomData();
  return (
    <div className="">
      <h2 className="title employee__title">Сотрудники</h2>
      <EmployeeTable employee={employee} />
    </div>
  );
};

export default EmployeeTablePage;
