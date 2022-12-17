import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { handleLocalStorage } from "~/store/features/functions";

const PATIENTS_LIST = "PATIENTS_LIST";
const initialState = handleLocalStorage(PATIENTS_LIST);

const patientsSlice = createSlice({
  name: "patients",
  initialState: initialState,
  reducers: {
    savePatient(state, action) {
      const { id, avatar } = action.payload;
      const index = state.patients.findIndex((patient) => patient.id === id);
      if (index === -1) {
        if (state.currDate !== format(new Date(), "yyMMdd")) {
          state.currDate = format(new Date(), "yyMMdd");
          state.maxPID = 0;
        }
        state.maxPID += 1;
        state.patients.push({
          ...action.payload,
          avatar: avatar ? avatar : null,
          pid: `${state.currDate}${("000" + state.maxPID).slice(-4)}`,
          createDate: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
        });
      } else {
        state.patients[index] = {
          ...state.patients[index],
          ...action.payload,
          avatar: avatar ? avatar : null,
        };
      }
      handleLocalStorage(PATIENTS_LIST, state);
      return state;
    },
    deletePatient(state, action) {
      const index = state.patients.findIndex(
        (patient) => patient.id === action.payload
      );
      if (index !== -1) {
        state.patients.splice(index, 1);
      }
      handleLocalStorage(PATIENTS_LIST, state);
      return state;
    },
  },
});

export default patientsSlice.reducer;
export const { savePatient, deletePatient } = patientsSlice.actions;
export const getPatientById = (id) => (state) =>
  state.patients.patients.find((patient) => patient.id === id);
