import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';
import themeReducer from './themeSlice';
import modalReducer from './modalSlice';
import toastReducer from './toastSlice';


const store = configureStore({
  reducer: {
    bookings: bookingReducer,
    theme: themeReducer,
    modal: modalReducer,
    toast: toastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
