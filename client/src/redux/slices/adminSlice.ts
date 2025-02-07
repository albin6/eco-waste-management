import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Retrieve admin data from localStorage
const storedAdmin = localStorage.getItem("admin");
const initialState = storedAdmin
  ? JSON.parse(storedAdmin)
  : {
      isAuthenticated: false,
      token: null,
      adminInfo: null,
    };

interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
  adminInfo: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (
      state,
      action: PayloadAction<{
        token: string;
        adminInfo: AdminState["adminInfo"];
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.adminInfo = action.payload.adminInfo;
      localStorage.setItem("admin", JSON.stringify(state)); // Save to localStorage
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.adminInfo = null;
      localStorage.removeItem("admin"); // Remove from localStorage
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
