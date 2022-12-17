import { createSlice } from "@reduxjs/toolkit";
import { handleLocalStorage } from "~/store/features/functions";

const MEDICAL_VISITS_META_INFO = "MEDICAL_VISITS_META_INFO";
const initialState = handleLocalStorage(MEDICAL_VISITS_META_INFO);

const medicalVisitsMetaInfoSlice = createSlice({
  name: "medicalVisitsMetaInfo",
  initialState: initialState,
  reducers: {
    saveVisitMetaInfo(state, action) {
      const { id } = action.payload;
      const index = state.findIndex((inquiry) => inquiry.id === id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      }
      handleLocalStorage(MEDICAL_VISITS_META_INFO, state);
      return state;
    },
    deleteVisitMetaInfo(state, action) {
      const index = state.findIndex((inquiry) => inquiry.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      handleLocalStorage(MEDICAL_VISITS_META_INFO, state);
      return state;
    },
  },
});

export default medicalVisitsMetaInfoSlice.reducer;
export const { saveVisitMetaInfo, deleteVisitMetaInfo } =
  medicalVisitsMetaInfoSlice.actions;
export const getMedicalVisitMetaInfoById = (id) => (state) =>
  state.medicalVisitsMetaInfo.find((visit) => visit.id === id);
