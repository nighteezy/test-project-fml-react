import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../store/employeeSlice";
import "./AddEmployee.css";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newEmployee = {
      id: Math.random(),
      ...data,
    };
    dispatch(addEmployee(newEmployee));
    navigate("/employee");
  };

  return (
    <div className="add-employee">
      <div className="add-employee__header">
        <button className="btn-back" onClick={() => navigate("/employee")}>
          ←
        </button>
      </div>
      <div className="container__form">
        <form onSubmit={handleSubmit(onSubmit)} className="add-employee__form">
          <div className="form-group">
            <label className="common-detail-card__label">ФИО:</label>
            <input
              {...register("fullName", {
                required: "ФИО обязательно для заполнения",
              })}
              placeholder="Введите ФИО"
            />
            {errors.fullName && (
              <p className="error">{errors.fullName.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="common-detail-card__label">Возраст:</label>
            <input
              type="number"
              {...register("age", {
                required: "Возраст обязателен для заполнения",
                valueAsNumber: true,
                min: { value: 18, message: "Возраст не может быть меньше 18" },
              })}
              placeholder="Введите возраст"
            />
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>

          <div className="form-group">
            <label className="common-detail-card__label">Должность:</label>
            <select
              className="form-select"
              {...register("position", { required: "Выберите должность" })}
            >
              <option value="менеджер">Менеджер</option>
              <option value="разработчик">Разработчик</option>
              <option value="дизайнер">Дизайнер</option>
            </select>
            {errors.position && (
              <p className="error">{errors.position.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="common-detail-card__label">Почта:</label>
            <input
              type="email"
              {...register("email", {
                required: "Почта обязательна для заполнения",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Введите корректный email",
                },
              })}
              placeholder="Введите почту"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="common-detail-card__label">Телефон:</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Телефон обязателен для заполнения",
                pattern: {
                  value: /^\+7\d{3}-\d{3}-\d{2}-\d{2}$/,
                  message: "Введите телефон в формате +7(XXX)-XXX-XX-XX",
                },
              })}
              placeholder="+7(XXX)-XXX-XX-XX"
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label className="common-detail-card__label">Адрес:</label>
            <input
              type="text"
              {...register("address", {
                required: "Адрес обязателен для заполнения",
              })}
              placeholder="Введите адрес"
            />
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="common-detail-card__label">
              Дата трудоустройства:
            </label>
            <input
              type="date"
              {...register("employmentDate", {
                required: "Укажите дату трудоустройства",
              })}
            />
            {errors.employmentDate && (
              <p className="error">{errors.employmentDate.message}</p>
            )}
          </div>

          <button type="submit" className="btn-ready submit-button">
            Готово
          </button>
        </form>
        <div className="add-employee__img">
          <img src="./img/add-img.png" alt="Добавить фото сотрудника" />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
