import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="logo">
          <img src="/img/logo.svg" alt="Логотип FML" />
        </Link>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img
              src="/img/dashboard.svg"
              alt="Информационная панель"
              className="icon"
            />
          </NavLink>
          <NavLink
            to="/task"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src="/img/task.svg" alt="Задачи" className="icon" />
          </NavLink>
          <NavLink
            to="/employee"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src="/img/employee.svg" alt="Сотрудники" className="icon" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
