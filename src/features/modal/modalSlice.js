import { createSlice } from "@reduxjs/toolkit";
import { MODAL_TYPE } from "../../content/Modal_Type";

const initialState = {
  isOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
