import { createSlice } from "@reduxjs/toolkit";

import { handleLocalStorage } from "~/store/features/functions";

const CHUC_DANH = "CHUC_DANH";
const CHUC_VU = "CHUC_VU";

const initialState = {
  chucDanh: handleLocalStorage(CHUC_DANH),
  chucVu: handleLocalStorage(CHUC_VU),
};

const othersInfoSlice = createSlice({
  name: "otherInfo",
  initialState: initialState,
  reducers: {},
});

export default othersInfoSlice.reducer;
export const getOtherInfoById =
  ({ name, id }) =>
  (state) =>
    state.othersInfo[name].find((item) => item.id === id);
