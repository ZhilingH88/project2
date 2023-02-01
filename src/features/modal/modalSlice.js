import { createSlice } from "@reduxjs/toolkit";
import { MODAL_TYPE } from "../../content/Modal_Type";

const initialState = {
  isOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.modalType = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
