import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployees } from "../../store/employeeSlice";
import { selectTasks } from "../../store/taskSlice";
import "./EmployeeCard.css";

const EmployeeCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployees());
    }
  }, [id, dispatch]);

  const employees = useSelector((state) => state.employees.employees);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);
  const tasks = useSelector(selectTasks);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Произошла ошибка: {error}</div>;

  if (!Array.isArray(employees)) {
    return <div>Данные о сотрудниках недоступны.</div>;
  }

  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return <div>Нет данных о сотруднике.</div>;
  }

  const employeeTasks = tasks.filter((task) => task.employeeId === employee.id);

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="employee-detail">
      <button className="btn-back" onClick={() => navigate("/employee")}>
        ←
      </button>
      <div className="common-detail-card__info">
        <div className="common-detail-card__labels">
          <p className="common-detail-card__label">ФИО:</p>
          <p className="common-detail-card__label">Возраст:</p>
          <p className="common-detail-card__label">Отдел:</p>
          <p className="common-detail-card__label">Должность:</p>
          <p className="common-detail-card__label">Email:</p>
          <p className="common-detail-card__label">Телефон:</p>
          <p className="common-detail-card__label">Адрес:</p>
          <p className="common-detail-card__label">Стаж:</p>
          <p className="common-detail-card__label">Дата трудоустройства:</p>
        </div>
        <div className="common-detail-card__values">
          <p className="common-detail-card__value">{employee.fullName}</p>
          <p className="common-detail-card__value">{employee.age} лет</p>
          <p className="common-detail-card__value">{employee.department}</p>
          <p className="common-detail-card__value">{employee.position}</p>
          <p className="common-detail-card__value">{employee.email}</p>
          <p className="common-detail-card__value">{employee.phone}</p>
          <p className="common-detail-card__value">{employee.address}</p>
          <p className="common-detail-card__value">{employee.experience} лет</p>
          <p className="common-detail-card__value">{employee.employmentDate}</p>
        </div>
        <div className="common-detail-card__photo">
          <img
            className="common-detail-card__photo-img"
            src={employee.photo}
            alt={employee.fullName}
          />
        </div>
      </div>

      <div className="employee-detail__tasks">
        {employeeTasks.length > 0 ? (
          <div className="employee-detail__tasks-list">
            <h3 className="employee-detail__tasks-title title-reset">
              Задачи сотрудника:
            </h3>
            <table className="employee-detail__tasks-table">
              <thead>
                <tr className="employee-detail__tasks-header">
                  <th>Номер задачи</th>
                  <th>Что нужно сделать</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {employeeTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="employee-detail__task-row"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <td>{task.id}</td>
                    <td>{task.description}</td> <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="employee-detail__tasks-title">
            У сотрудника нет задач.
          </p>
        )}
      </div>

      {employee.children && employee.children.length > 0 ? (
        <div className="employee-detail__children">
          <h3 className="employee-detail__children-title title-reset">
            Дети сотрудника:
          </h3>
          <ul className="employee-detail__children-list list-reset">
            {employee.children.map((child, index) => (
              <li key={index} className="employee-detail__children-item">
                {child.name}, Возраст: {child.age} лет
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="employee-detail__no-children">У сотрудника нет детей.</p>
      )}
    </div>
  );
};

export default EmployeeCard;
