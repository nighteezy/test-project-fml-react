import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  fetchEmployees,
  selectEmployees,
  removeEmployee,
} from "../../store/employeeSlice";
import "./EmployeeTable.css";
import "../../styles/commonTableStyles.css";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Pagination from "../Pagination/Pagination";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(selectEmployees);
  const [filteredData, setFilteredData] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const action = await dispatch(fetchEmployees());
      if (fetchEmployees.rejected.match(action)) {
        console.error("Ошибка при загрузке сотрудников");
      }
    };

    if (employees.length === 0) {
      fetchData();
    } else {
      setFilteredData(employees);
    }
  }, [dispatch, employees]);

  useEffect(() => {
    setFilteredData(employees);
  }, [employees]);

  const data = useMemo(() => filteredData, [filteredData]);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "ФИО", accessor: "fullName" },
      { Header: "Возраст", accessor: "age" },
      { Header: "Почта", accessor: "email" },
      { Header: "Телефон", accessor: "phone" },
      { Header: "Должность", accessor: "position" },
      {
        Header: "Действия",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                setEmployeeToDelete(row.original);
                setIsConfirmationOpen(true);
              }}
              className="btn-reset btn-remove"
            >
              Удалить
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDeleteEmployee = async () => {
    if (employeeToDelete) {
      await dispatch(removeEmployee(employeeToDelete.id));
      setIsConfirmationOpen(false);
      setEmployeeToDelete(null);
      dispatch(fetchEmployees()); // Обновить список сотрудников после удаления
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
    previousPage,
    nextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  if (!employees.length) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="common-table__container">
      <div className="common-table__buttons">
        <button
          className="btn-reset common-table__btn-add employee-table__btn-add"
          onClick={() => navigate("/add-employee")}
        >
          Добавить сотрудника
        </button>
        <Search data={employees} setFilteredData={setFilteredData} />
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDeleteEmployee}
        title="Удаление сотрудника"
        message="Вы уверены, что хотите удалить этого сотрудника?"
      />

      <table {...getTableProps()} className="common-table">
        <thead className="common-table__header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.id !== "actions" ? column.getSortByToggleProps() : {}
                  )}
                  key={column.id}
                >
                  {column.render("Header")}
                  {column.id !== "actions" && (
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ↓"
                          : " ↑"
                        : ""}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="common-table__body">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.original.id}
                onClick={() => navigate(`/employee/${row.original.id}`)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageOptions.length}
        pageIndex={pageIndex}
      />
    </div>
  );
};

export default EmployeeTable;
