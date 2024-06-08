import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += 40 * action.payload.quantity;
    },
    addProductfrompage: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += 40 * action.payload.quantity;
    },
  },
});


export const { addProduct, addProductfrompage } = cartSlice.actions;
export default cartSlice.reducer;