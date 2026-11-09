import { createSlice } from '@reduxjs/toolkit';

// String kosong berarti "semua kategori".
const categorySlice = createSlice({
  name: 'selectedCategory',
  initialState: '',
  reducers: {
    setSelectedCategory(state, action) {
      return action.payload;
    },
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
