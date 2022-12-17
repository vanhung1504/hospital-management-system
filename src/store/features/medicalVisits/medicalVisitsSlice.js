import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { handleLocalStorage } from "~/store/features/functions";

const MEDICAL_VISITS = "MEDICAL_VISITS";
const initialState = handleLocalStorage(MEDICAL_VISITS);

const medicalVisitsSlice = createSlice({
  name: "medicalVisits",
  initialState: initialState,
  reducers: {
    saveVisit(state, action) {
      const { id, examDate } = action.payload;

      if (!Boolean(id)) {
        state.push({
          ...action.payload,
          id: uuidv4(),
          createDate: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
          status: -1,
        });
      } else {
        const index = state.findIndex((visit) => visit.id === id);
        if (index !== -1) {
          let { status } = action.payload;
          switch (status) {
            case "Chờ khám":
              status = -1;
              break;
            case "Đang khám":
              status = 0;
              break;
            case "Đang nằm viện":
              status = 1;
              break;
            case "Đã ra viện":
              status = 2;
              break;
            default:
              break;
          }

          if (examDate)
            action.payload.examDate = format(
              action.payload.examDate,
              "yyyy/MM/dd HH:mm:ss"
            );

          state[index] = {
            ...state[index],
            ...action.payload,
            status: status,
          };
        }
      }

      handleLocalStorage(MEDICAL_VISITS, state);
      return state;
    },
    deleteVisit(state, action) {
      const index = state.findIndex((visit) => visit.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      handleLocalStorage(MEDICAL_VISITS, state);
      return state;
    },
  },
});

export default medicalVisitsSlice.reducer;
export const { saveVisit, deleteVisit } = medicalVisitsSlice.actions;
export const getMedicalVisitByPatientId = (pid) => (state) => {
  return state.medicalVisits
    .filter((visit) => visit.patientId === pid)
    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
};
export const getMedicalVisitById = (id) => (state) =>
  state.medicalVisits.find((visit) => visit.id === id);
