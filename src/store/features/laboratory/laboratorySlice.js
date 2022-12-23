import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { handleLocalStorage } from "~/store/features/functions";
import { v4 as uuidv4 } from "uuid";
const LABORATORY = "LABORATORY";
const initialState = handleLocalStorage(LABORATORY);

const laboratorySlice = createSlice({
  name: "laboratory",
  initialState: initialState,
  reducers: {
    barcodeGeneration(state, action) {
      state.maxSID += 1;
      state.data.push({
        ...action.payload,
        id: uuidv4(),
        sid: ("00000" + state.maxSID).slice(-6),
        receiptDate: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
      });

      handleLocalStorage(LABORATORY, state);
      return state;
    },
    deleteBarcode(state, action) {
      const { id, data } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);

      if (index !== -1) {
        if (data.length === state.data[index].clsXN.length) {
          state.data.splice(index, 1);
        } else {
          data.forEach((item) => {
            const indexService = state.data[index].clsXN.findIndex(
              (ser) => ser.serviceId === item
            );

            if (indexService !== -1) {
              state.data[index].clsXN.splice(indexService, 1);
            }
          });
        }
      }
      handleLocalStorage(LABORATORY, state);
      return state;
    },
    saveResult(state, action) {
      const { id, data } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);

      if (index !== -1) {
        data.forEach((item) => {
          const indexService = state.data[index].clsXN.findIndex(
            (ser) => ser.serviceId === item.id
          );

          if (indexService !== -1) {
            state.data[index].clsXN[indexService] = {
              serviceId: item.id,
              result: item.result,
            };
          }
        });
      }

      handleLocalStorage(LABORATORY, state);
      return state;
    },
  },
});

export default laboratorySlice.reducer;
export const { barcodeGeneration, deleteBarcode, saveResult } =
  laboratorySlice.actions;
export const getLaboById = (id) => (state) =>
  state.laboratory.data.find((item) => item.id === id);
export const getClsXNbyVisitId = (id) => (state) =>
  state.laboratory.data
    .filter((item) => item.visitId === id)
    .reduce((acc, item) => [...acc, ...item.clsXN], []);
