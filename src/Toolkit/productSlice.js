import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bestProducts: [],
  categories: [], // Add categories to the initial state
  filter: { category: "all" },
  page: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
     
      state.page = action.payload;
    },
    getCategoryFilter: (state, action) => {
      
      state.filter = {category :action.payload};
    },
    setFilter: (state, action) => {
      console.log(action);
      const { name, value } = action.payload;
      state.filter = { ...state.filter, [name]: value };
    },
    setBestProducts: (state, action) => {
      state.bestProducts = action.payload;
    },
    setCategories: (state, action) => {
      // Add reducer to set categories
      state.categories = action.payload;
    },
    updateProductState: (state, action) => {
      const index = state.data.findIndex(
        (product) => product.slug === action.payload.slug,
      );
      if (index !== -1) {
        state.data[index] = action.payload.product;
      }
    },
    deleteProductState: (state, action) => {
      const index = state.data.findIndex(
        (product) => product.slug === action.payload,
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});

export const {
  setProducts,
  deleteProductState,
  setPage,
  updateProductState,
  setBestProducts,
  getCategoryFilter,
  setFilter,
  setCategories, // Export the new action
} = productsSlice.actions;
export default productsSlice.reducer;
