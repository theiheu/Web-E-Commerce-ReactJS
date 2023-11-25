import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    carts: [],
  },
  reducers: {
    handleAddProductToCart: (state, action) => {
      // Tìm kiếm trong mảng xem có đối tượng nào có _id giống với obj không
      const existingObj = state?.carts?.find(
        (item) => item._id === action.payload._id
      );
      if (existingObj) {
        console.log("Line: 12 - Here");
        // Nếu tìm thấy, tăng giá trị quantity thêm 1
        existingObj.quantity += action.payload.quantity;
      } else {
        state.carts = [action.payload, ...state.carts];
      }
    },

    handleRemoveProductToCart: (state, action) => {
      const newCarts = state.carts.filter((item) => {
        return item._id !== action.payload;
      });

      state.carts = newCarts;
    },
  },
});
export const { handleAddProductToCart, handleRemoveProductToCart } =
  orderSlice.actions;
export default orderSlice.reducer;
