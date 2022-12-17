import { createSlice } from "@reduxjs/toolkit";

import { handleLocalStorage } from "~/store/features/functions";

const ROLES_LIST = "ROLES_LIST";
const initialState = handleLocalStorage(ROLES_LIST);

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {},
});

export default rolesSlice.reducer;
