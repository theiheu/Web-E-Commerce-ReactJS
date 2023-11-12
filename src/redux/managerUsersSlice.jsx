import { createSlice } from "@reduxjs/toolkit";

export const managerUsersSlice = createSlice({
  name: "managerUsers",
  initialState: {
    dataUser: {
      id: "",
      email: "",
      phone: "",
      fullName: "",
      role: "",
      avatar: "",
    },
  },
  reducers: {
    fetchUsers: (state, action) => {
      return {
        dataUser: action.payload,
      };
    },
  },
});
