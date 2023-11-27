import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    carts: [],
    bill: {},
  },
  reducers: {
    handleAddProductToCart: (state, action) => {
      const existingObj = state?.carts?.find(
        (item) => item._id === action.payload._id
      );
      if (existingObj) {
        existingObj.quantity += action.payload.quantity;
      } else {
        state.carts = [action.payload, ...state.carts];
      }

      message.success("Bạn đã thêm sản phẩm vào giỏ hàng thành công.");
    },

    handleRemoveProductToCart: (state, action) => {
      const newCarts = state.carts.filter((item) => {
        return item._id !== action.payload;
      });

      state.carts = newCarts;
    },
    handleQuantity: (state, action) => {
      const existingObj = state?.carts?.find(
        (item) => item._id === action.payload._id
      );
      if (existingObj) {
        existingObj.quantity = action.payload.quantity;
      } else {
        state.carts = [action.payload, ...state.carts];
      }
    },

    doCreateBill: (state, action) => {
      state.bill = action.payload;
    },
  },
});
export const {
  handleAddProductToCart,
  handleRemoveProductToCart,
  handleQuantity,
  doCreateBill,
} = orderSlice.actions;
export default orderSlice.reducer;
