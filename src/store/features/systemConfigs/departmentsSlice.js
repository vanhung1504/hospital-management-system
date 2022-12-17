import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { handleLocalStorage } from "~/store/features/functions";

const DEPARTEMENTS_LIST = "DEPARTEMENTS_LIST";
const initialState = handleLocalStorage(DEPARTEMENTS_LIST);

const departmentsSlice = createSlice({
  name: "depatements",
  initialState: initialState,
  reducers: {
    saveDepatement(state, action) {
      if (action.payload.id === null) {
        state.push({
          id: uuidv4(),
          name: action.payload.value.trim(),
        });
      } else {
        const indexOfObject = state.findIndex((object) => {
          return object.id === action.payload.id;
        });
        state[indexOfObject].name = action.payload.value.trim();
      }
      handleLocalStorage(DEPARTEMENTS_LIST, state);
      return state;
    },
    delDepartement(state, action) {
      const indexOfObject = state.findIndex((object) => {
        return object.id === action.payload;
      });
      state.splice(indexOfObject, 1);
      handleLocalStorage(DEPARTEMENTS_LIST, state);
      return state;
    },
  },
});

export default departmentsSlice.reducer;
export const { saveDepatement, delDepartement } = departmentsSlice.actions;
export const getDepartementById = (id) => (state) =>
  state.departments.find((dep) => dep.id === id);
