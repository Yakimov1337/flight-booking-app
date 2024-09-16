import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  bookingId: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  bookingId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.bookingId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.bookingId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
