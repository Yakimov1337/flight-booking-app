import { createSlice } from '@reduxjs/toolkit';

const initialTheme = window.localStorage.getItem('theme') || 'dark'; //default dark theme

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialTheme, 
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'; //switch current theme state
      window.localStorage.setItem('theme', state.mode);  
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
