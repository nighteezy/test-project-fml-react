import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

const LazyLayout = lazy(() => import("./components/Layout/Layout"));
const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyEmployeeTablePage = lazy(() =>
  import("./pages/EmployeeTablePage/EmployeeTablePage")
);
const LazyEmployeeCardPage = lazy(() =>
  import("./pages/EmployeeCardPage/EmployeeCardPage")
);
const LazyTaskPage = lazy(() => import("./pages/TaskPage/TaskPage"));
const LazyTaskCardPage = lazy(() =>
  import("./pages/TackCardPage/TaskCardPage")
);
const LazyAddEmployeePage = lazy(() =>
  import("./pages/AddEmployeePage/AddEmployePage")
);
const LazyAddTaskPage = lazy(() => import("./pages/AddTaskPage/AddTaskPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyLayout />}>
            <Route path="/" element={<LazyMainPage />} />
            <Route path="/employee" element={<LazyEmployeeTablePage />} />
            <Route path="/employee/:id" element={<LazyEmployeeCardPage />} />
            <Route path="/task" element={<LazyTaskPage />} />
            <Route path="/task/:id" element={<LazyTaskCardPage />} />
            <Route path="/add-employee" element={<LazyAddEmployeePage />} />
            <Route path="/add-task" element={<LazyAddTaskPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
