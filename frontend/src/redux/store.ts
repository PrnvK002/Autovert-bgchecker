// file: store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user.reducer";
import fieldReducer from "./reducer/field.reducer";
import templateReducer from "./reducer/template.reducer";
import versionReducer from "./reducer/version.reducer";

const reducer = {
  userReducer: userReducer,
  fieldReducer: fieldReducer,
  templateReducer: templateReducer,
  versionReducer:versionReducer
};

export const store = configureStore({
  reducer,
});

export type IRootState = ReturnType<typeof store.getState>
