import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import Select from "react-select";
import { selectEmployees, fetchEmployees } from "../../store/employeeSlice";
import {
  fetchTasks,
  updateTask,
  removeTask,
  selectTasks,
} from "../../store/taskSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Pagination from "../Pagination/Pagination";
import "./TaskTable.css";
import "../../styles/commonTableStyles.css";

const TaskTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(selectEmployees);
  const tasks = useSelector(selectTasks);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const taskAction = await dispatch(fetchTasks());
      const employeeAction = await dispatch(fetchEmployees());

      if (
        fetchTasks.rejected.match(taskAction) ||
        fetchEmployees.rejected.match(employeeAction)
      ) {
        console.error("Ошибка при загрузке данных");
      }
    };

    if (tasks.length === 0) {
      fetchData();
    } else {
      setFilteredData(tasks);
    }
  }, [dispatch, tasks, tasks.length]);

  useEffect(() => {
    setFilteredData(tasks);
  }, [tasks]);

  const employeeOptions = useMemo(() => {
    return employees.map((employee) => ({
      value: employee.id,
      label: employee.fullName,
    }));
  }, [employees]);

  const statusOptions = useMemo(
    () => [
      { value: "В ожидании", label: "В ожидании" },
      { value: "В процессе", label: "В процессе" },
      { value: "Выполнена", label: "Выполнена" },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Описание",
        accessor: "description",
        Cell: ({ row }) => (
          <div>
            <strong>{row.original.title}</strong>
            <p>{row.original.description}</p>
          </div>
        ),
      },
      { Header: "Дата", accessor: "date" },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ row }) => {
          const currentStatus = statusOptions.find(
            (option) => option.value === row.original.status
          );
          return (
            <Select
              options={statusOptions}
              value={currentStatus || null}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  dispatch(
                    updateTask({
                      id: row.original.id,
                      updates: { status: selectedOption.value },
                    })
                  );
                }
              }}
              placeholder="Выберите статус"
            />
          );
        },
        CellClassName: "status-cell",
      },
      {
        Header: "Исполнитель",
        accessor: "employeeId",
        Cell: ({ row }) => {
          const currentEmployee = employeeOptions.find(
            (option) => option.value === row.original.employeeId
          );
          return (
            <Select
              options={employeeOptions}
              value={currentEmployee || null}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  dispatch(
                    updateTask({
                      id: row.original.id,
                      updates: { employeeId: selectedOption.value },
                    })
                  );
                }
              }}
              placeholder="Выберите исполнителя"
            />
          );
        },
        CellClassName: "employee-cell",
      },
      {
        Header: "Действия",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                setTaskToDelete(row.original);
                setModalOpen(true);
              }}
              className="btn-reset btn-remove"
            >
              Удалить
            </button>
          </div>
        ),
      },
    ],
    [dispatch, employeeOptions, statusOptions]
  );

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      await dispatch(removeTask(taskToDelete.id));
      setModalOpen(false);
      setTaskToDelete(null);
      dispatch(fetchTasks());
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
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    useSortBy,
    usePagination
  );

  if (!tasks.length) {
    return <div>Загрузка.</div>;
  }

  return (
    <div className="common-table__container">
      <div className="common-table__buttons">
        <button
          className="btn-reset common-table__btn-add task-btn__add"
          onClick={() => navigate("/add-task")}
        >
          Добавить задачу
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteTask}
        title="Удаление задачи"
        message="Вы уверены, что хотите удалить эту задачу?"
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
                onClick={(e) => {
                  const targetColumn = e.target.closest("td")?.className;
                  if (
                    targetColumn !== "status-cell" &&
                    targetColumn !== "employee-cell"
                  ) {
                    navigate(`/task/${row.original.id}`);
                  }
                }}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className={cell.column.CellClassName || ""}
                  >
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

export default TaskTable;
