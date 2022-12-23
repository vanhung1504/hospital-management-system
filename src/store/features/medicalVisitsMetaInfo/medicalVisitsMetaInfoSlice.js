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
      const index = state.findIndex((visit) => visit.id === id);
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
      const index = state.findIndex((visit) => visit.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      handleLocalStorage(MEDICAL_VISITS_META_INFO, state);
      return state;
    },
    saveMedicine(state, action) {
      const { id, medicine } = action.payload;
      const index = state.findIndex((visit) => visit.id === id);
      if (index === -1) {
        state.push({
          id: id,
          medicines: [{ ...medicine }],
        });
      } else {
        const isExistMedicines = state[index].hasOwnProperty("medicines");
        if (!isExistMedicines) {
          state[index].medicines = [{ ...medicine }];
        } else {
          const medicines = state[index].medicines;

          const indexDrug = medicines.findIndex(
            (drug) => drug.medicineId === medicine.medicineId
          );

          if (indexDrug === -1) {
            state[index].medicines.push(medicine);
          } else {
            state[index].medicines[indexDrug] = medicine;
          }
        }
      }
      handleLocalStorage(MEDICAL_VISITS_META_INFO, state);
      return state;
    },
    deleteMedicine(state, action) {
      const { visitId, id } = action.payload;
      const index = state.findIndex((visit) => visit.id === visitId);
      if (index !== -1) {
        const medicines = state[index]?.medicines;
        if (medicines) {
          const medIndex = medicines.findIndex((med) => med.medicineId === id);
          if (medIndex !== -1) {
            state[index].medicines.splice(medIndex, 1);
          }
        }
      }
      handleLocalStorage(MEDICAL_VISITS_META_INFO, state);
      return state;
    },
  },
});

export default medicalVisitsMetaInfoSlice.reducer;
export const {
  saveVisitMetaInfo,
  deleteVisitMetaInfo,
  saveMedicine,
  deleteMedicine,
} = medicalVisitsMetaInfoSlice.actions;
export const getMedicalVisitMetaInfoById = (id) => (state) =>
  state.medicalVisitsMetaInfo.find((visit) => visit.id === id);
