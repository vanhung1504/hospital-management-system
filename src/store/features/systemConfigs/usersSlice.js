import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { encodePassword, handleLocalStorage } from "~/store/features/functions";

const USERS_LIST = "USERS_LIST";
const initialState = handleLocalStorage(USERS_LIST);

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    saveUser(state, action) {
      const { id } = action.payload;
      if (id === undefined || id === "") {
        state.maxUserCode += 1;
        state.users.push({
          ...action.payload,
          id: uuidv4(),
          userCode: `TA1.${("000" + state.maxUserCode).slice(-4)}`,
          password: encodePassword("123"),
        });
      } else {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...action.payload,
          };
        }
      }
      handleLocalStorage(USERS_LIST, state);
      return state;
    },
  },
});

export default usersSlice.reducer;
export const { saveUser } = usersSlice.actions;
export const getUserById = (id) => (state) =>
  state.users.users.find((user) => user.id === id);
