import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="appPage">
      <Header />
      <main className="main">
        <div className="main__container container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
