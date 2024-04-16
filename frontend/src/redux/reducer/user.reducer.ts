import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../utils/axiosinstance.util";

const order = sessionStorage.getItem("order")
  ? JSON.parse(sessionStorage.getItem("order")!)
  : [];
const fields = sessionStorage.getItem("fields")
  ? JSON.parse(sessionStorage.getItem("fields")!)
  : {};
const user = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user")!)
  : {};

const template = sessionStorage.getItem("template")
  ? JSON.parse(sessionStorage.getItem("template")!)
  : {};

const initialState = {
  user: user,
  loading: false,
  err: "",
  order: order,
  success: false,
  fields: fields,
  template: template,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await Client.post("/auth/login", payload);
      console.log("response from login", data);
      localStorage.setItem("token", JSON.stringify(data.data.token));
      return data.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const udpateDetails = createAsyncThunk(
  "user/info",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await Client.put("/user/infosubmit", payload);
      console.log("response from submission of info", data);
      return data;
    } catch (error: any) {
      console.log("error on infor submission", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.order = action.payload.order;
      state.fields = action.payload.fields;
      state.template = action.payload.template;
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("order", JSON.stringify(action.payload.order));
      sessionStorage.setItem("fields", JSON.stringify(action.payload.fields));
      sessionStorage.setItem(
        "template",
        JSON.stringify(action.payload.template)
      );
    });
    builder.addCase(loginUser.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
    builder.addCase(udpateDetails.fulfilled, (state, _) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(udpateDetails.pending, (state, _) => {
      state.loading = true;
      state.err = "";
      state.success = false;
    });
    builder.addCase(udpateDetails.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
  },
});

export default userSlice.reducer;
