import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const managerUsersSlice = createSlice({
  name: "managerUsers",
  initialState: {
    dataListBooks: [],
    listCategory: [],
  },
  reducers: {
    fetchBooks: (state, action) => {
      return {
        ...state,
        dataListBooks: action.payload.map((item) => {
          return {
            ...item,
            key: item._id,
            updatedAt: moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
          };
        }),
      };
    },
    fetchListCategory: (state, action) => {
      return { ...state, listCategory: action.payload };
    },
    handlePaginationBookAction: (state, action) => {
      return {
        ...state,
        current: action.payload.current,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
      };
    },
    handleFilterAndSortBook: (state, { payload }) => {
      return {
        ...state,
        filters: payload.filters,
      };
    },
  },
});

export const {
  fetchBooks,
  fetchListCategory,
  handlePaginationBookAction,
  handleFilterAndSortBook,
} = managerUsersSlice.actions;
export default managerUsersSlice.reducer;
