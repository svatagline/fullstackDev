import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  productList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    addProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload,
      );
    },
    updateProduct: (state, action) => {
      const index = state.productList.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (index !== -1) {
        state.productList[index] = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductList, addProduct, removeProduct, updateProduct } =
  productSlice.actions;

export default productSlice.reducer;
