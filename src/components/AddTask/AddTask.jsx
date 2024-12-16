import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../store/taskSlice";
import { fetchEmployees, selectEmployees } from "../../store/employeeSlice";
import "./AddTask.css";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector(selectEmployees);

  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const onSubmit = async (data) => {
    try {
      await dispatch(addTask(data));
      navigate("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="add-task-container">
      <button className="btn-back" onClick={() => navigate("/task")}>
        ←
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="add-task-form">
        <div className="form-group">
          <label className="common-detail-card__label">Название задачи:</label>
          <input
            {...register("title", { required: "Это поле обязательно" })}
            placeholder="Введите название задачи"
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div className="form-group">
          <label className="common-detail-card__label">Описание:</label>
          <textarea
            {...register("description", {
              required: "Это поле обязательно",
            })}
            placeholder="Введите описание задачи"
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="common-detail-card__label">Дата выполнения:</label>
          <input
            type="date"
            {...register("date", { required: "Это поле обязательно" })}
          />
          {errors.date && <p className="error">{errors.date.message}</p>}
        </div>
        <div className="form-group">
          <label className="common-detail-card__label">Исполнитель:</label>
          <select
            {...register("employeeId", {
              required: "Это поле обязательно",
            })}
          >
            <option value="">Выберите исполнителя</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName}
              </option>
            ))}
          </select>
          {errors.employeeId && (
            <p className="error">{errors.employeeId.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="common-detail-card__label">Статус:</label>
          <select {...register("status", { required: "Это поле обязательно" })}>
            <option value="В ожидании">В ожидании</option>
            <option value="В процесс">В процессе</option>
            <option value="Выполнена">Выполнена</option>
          </select>
          {errors.status && <p className="error">{errors.status.message}</p>}
        </div>
        <button className="btn-ready" type="submit">
          Готово
        </button>
      </form>
    </div>
  );
};

export default AddTask;
