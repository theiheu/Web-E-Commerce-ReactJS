import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    carts: [],
    order: [],
    bill: {},
    stepOrder: 0,
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
    handleAddProductToOrder: (state, action) => {
      const existingObj = state?.order?.find(
        (item) => item._id === action.payload._id
      );
      if (existingObj) {
        existingObj.quantity += action.payload.quantity;
      } else {
        state.order = [action.payload, ...state.order];
      }

      message.success("Bạn đã thêm sản phẩm vào giỏ hàng thành công.");
    },

    handleRemoveProductToCart: (state, action) => {
      const newCarts = state.carts.filter((item) => {
        return item._id !== action.payload;
      });

      state.carts = newCarts;
    },

    handleRemoveProductToOrder: (state, action) => {
      const newCarts = state.order.filter((item) => {
        return item._id !== action.payload;
      });

      state.order = newCarts;
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

    handleProductToOrder: (state, action) => {
      state.order = action.payload[0].filter((item) => {
        return action.payload[1].includes(item._id);
      });
    },

    doCreateBill: (state, action) => {
      state.bill = action.payload;
    },

    handleStepOrder: (state, action) => {
      if (action.payload == "next") {
        state.stepOrder += 1;
      } else if (action.payload == "prev") {
        state.stepOrder -= 1;
      } else if (typeof action.payload === "number") {
        state.stepOrder = action.payload;
      }
    },
  },
});
export const {
  handleAddProductToCart,
  handleRemoveProductToCart,
  handleQuantity,
  handleAddProductToOrder,
  handleRemoveProductToOrder,
  handleProductToOrder,
  doCreateBill,
  handleStepOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
