import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { handleLocalStorage } from "~/store/features/functions";

const HEALTH_CARE_SERVICES = "HEALTH_CARE_SERVICES";
const initialState = handleLocalStorage(HEALTH_CARE_SERVICES);

const healthCareServicesSlice = createSlice({
  name: "healthCareServices",
  initialState: initialState,
  reducers: {
    saveService(state, action) {
      action.payload.price = Number(action.payload.price.replace(/\./g, ""));
      const { serviceKey, id, name, price } = action.payload;
      if (!Boolean(id)) {
        state[serviceKey].data.push({
          id: uuidv4(),
          name: name,
          price: price,
        });
      } else {
        const index = state[serviceKey].data.findIndex((object) => {
          return object.id === id;
        });
        if (index !== -1) {
          state[serviceKey].data[index] = {
            ...state[serviceKey].data[index],
            name: name,
            price: price,
          };
        }
      }
      handleLocalStorage(HEALTH_CARE_SERVICES, state);
      return state;
    },
    deleteService(state, action) {
      const { serviceKey, id } = action.payload;
      const index = state[serviceKey].data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[serviceKey].data.splice(index, 1);
      }
      handleLocalStorage(HEALTH_CARE_SERVICES, state);
      return state;
    },
  },
});

export default healthCareServicesSlice.reducer;
export const { saveService, deleteService } = healthCareServicesSlice.actions;
export const getServiceByNameAndId =
  ({ serviceKey, id }) =>
  (state) =>
    state.healthCareServices[serviceKey].data.find((item) => item.id === id);
