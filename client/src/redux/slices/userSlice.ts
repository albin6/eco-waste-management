import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Retrieve user data from localStorage
const storedUser = localStorage.getItem("user");
const initialState = storedUser
  ? JSON.parse(storedUser)
  : {
      isAuthenticated: false,
      userInfo: null,
    };

interface UserState {
  isAuthenticated: boolean;
  userInfo: {
    _id: string;
    name: string;
    email: string;
    passoword: string;
    role: string;
  } | null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ userInfo: UserState["userInfo"] }>
    ) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
      localStorage.setItem("user", JSON.stringify(state)); // Save to localStorage
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
