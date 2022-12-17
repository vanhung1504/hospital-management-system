import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns/esm";
import { handleLocalStorage } from "~/store/features/functions";
const USER_LOGGEDIN = "USER_LOGGEDIN";
const initialState = handleLocalStorage(USER_LOGGEDIN);

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    submitLogin(state, action) {
      const currDate = new Date();
      const expiredDate = new Date(currDate.getTime() + 43200000);

      const newState = {
        ...state,
        id: action.payload,
        expired: format(expiredDate, "yyyy/MM/dd HH:mm"),
      };
      handleLocalStorage(USER_LOGGEDIN, newState);
      return newState;
    },
    submitLogout(state, action) {
      handleLocalStorage(USER_LOGGEDIN, {});
      return {};
    },
  },
});

export default loginSlice.reducer;
export const { submitLogin, submitLogout } = loginSlice.actions;
