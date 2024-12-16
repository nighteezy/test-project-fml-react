import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateRandomData } from "../api/apiEmployee";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = generateRandomData();
    return data;
  }
);

const saveToLocalStorage = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

const getEmployeesFromLocalStorage = () => {
  const cachedData = localStorage.getItem("employees");
  return cachedData ? JSON.parse(cachedData) : [];
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: getEmployeesFromLocalStorage(),
    loading: true,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
      state.loading = false;
      saveToLocalStorage(state.employees);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addEmployee: (state, action) => {
      const maxId =
        state.employees.length > 0
          ? Math.max(...state.employees.map((emp) => emp.id))
          : 0;
      const newEmployee = { ...action.payload, id: maxId + 1 };
      state.employees.push(newEmployee);
      saveToLocalStorage(state.employees);
      state.loading = false;
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      saveToLocalStorage(state.employees);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        saveToLocalStorage(state.employees);
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectEmployees = (state) => state.employees.employees;

export const {
  setEmployees,
  setLoading,
  setError,
  addEmployee,
  removeEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
