import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const managerUsersSlice = createSlice({
  name: "managerUsers",
  initialState: {
    dataListUser: [
      {
        key: "",
        _id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        updatedAt: "",
      },
    ],
  },
  reducers: {
    fetchUsers: (state, action) => {
      return {
        dataListUser: action.payload.map((item) => {
          return {
            ...item,
            key: item._id,
            updatedAt: moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
            role: item.role,
          };
        }),
      };
    },
    handlePaginationAction: (state, action) => {
      return {
        ...state,
        current: action.payload.current,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
      };
    },
    handleFilterAndSort: (state, { payload }) => {
      return {
        ...state,
        filters: payload.filters,
      };
    },
  },
});

export const { fetchUsers, handlePaginationAction } = managerUsersSlice.actions;
export default managerUsersSlice.reducer;
