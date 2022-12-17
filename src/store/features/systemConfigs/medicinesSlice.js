import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { handleLocalStorage } from "~/store/features/functions";

const MEDICINES_LIST = "MEDICINES_LIST";
const initialState = handleLocalStorage(MEDICINES_LIST);

const medicinesSlice = createSlice({
  name: "medicines",
  initialState: initialState,
  reducers: {
    saveMedicine(state, action) {
      const { id } = action.payload;
      if (!Boolean(id)) {
        state.push({
          ...action.payload,
          id: uuidv4(),
        });
      } else {
        const index = state.findIndex((item) => item.id === id);
        if (index !== -1) {
          state[index] = {
            ...state[index],
            ...action.payload,
          };
        }
      }
      handleLocalStorage(MEDICINES_LIST, state);
      return state;
    },
    deleteMedicine(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      handleLocalStorage(MEDICINES_LIST, state);
      return state;
    },
  },
});

export default medicinesSlice.reducer;
export const { saveMedicine, deleteMedicine } = medicinesSlice.actions;
export const getMedicineById = (id) => (state) =>
  state.medicines.find((medicine) => medicine.id === id);
