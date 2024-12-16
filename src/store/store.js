import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    tasks: taskReducer,
  },
});

export default store;
