import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, fetchTasks, selectLoading } from "../../store/taskSlice";
import { selectEmployees, fetchEmployees } from "../../store/employeeSlice";

const TaskCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTasks);
  const employees = useSelector(selectEmployees);
  const loadingTasks = useSelector(selectLoading);
  const loadingEmployees = useSelector((state) => state.employees.loading); // Assuming you have a loading state for employees as well

  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    }
    if (!employees.length) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, tasks.length, employees.length]);

  if (loadingTasks || loadingEmployees) {
    return <div>Загрузка данных...</div>;
  }

  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    return <div>Задача не найдена!</div>;
  }

  const employee = employees.find((emp) => emp.id === task.employeeId);

  return (
    <div className="task-detail">
      <button className="btn-back" onClick={() => navigate("/task")}>
        ←
      </button>
      <div className="common-detail-card__info">
        <div className="common-detail-card__labels">
          <p className="common-detail-card__label">Описание:</p>
          <p className="common-detail-card__label">Дата:</p>
          <p className="common-detail-card__label">Статус:</p>
          {employee && (
            <p className="common-detail-card__label">Исполнитель:</p>
          )}
        </div>
        <div className="common-detail-card__values">
          <p className="common-detail-card__value">{task.description}</p>
          <p className="common-detail-card__value">{task.date}</p>
          <p className="common-detail-card__value">{task.status}</p>
          {employee && (
            <p className="common-detail-card__value">{employee.fullName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
