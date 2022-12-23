import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/systemConfigs/usersSlice";
import departmentsSlice from "./features/systemConfigs/departmentsSlice";
import rolesSlice from "./features/systemConfigs/rolesSlice";
import loginSlice from "./features/login/loginSlice";
import othersInfoSlice from "./features/othersInfo/othersInfoSlice";
import patientsSlice from "./features/patients/patientsSlice";
import medicalVisitsSlice from "./features/medicalVisits/medicalVisitsSlice";
import medicalVisitsMetaInfoSlice from "./features/medicalVisitsMetaInfo/medicalVisitsMetaInfoSlice";
import healthCareServicesSlice from "./features/systemConfigs/healthCareServicesSlice";
import medicinesSlice from "./features/systemConfigs/medicinesSlice";
import laboratorySlice from "./features/laboratory/laboratorySlice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    userLoggedIn: loginSlice,
    departments: departmentsSlice,
    roles: rolesSlice,
    othersInfo: othersInfoSlice,
    patients: patientsSlice,
    medicalVisits: medicalVisitsSlice,
    medicalVisitsMetaInfo: medicalVisitsMetaInfoSlice,
    healthCareServices: healthCareServicesSlice,
    medicines: medicinesSlice,
    laboratory: laboratorySlice,
  },
});

export default store;
