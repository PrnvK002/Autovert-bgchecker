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
  applicants: [],
  applicant: {},
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

export const getApplicants = createAsyncThunk(
  "user/applicants",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Client.get("/user/applicants");
      console.log("datafrom appliacnst", data);
      return data.data;
    } catch (error: any) {
      console.log("error on getapplicants", error);
      rejectWithValue(error.response.data.message);
    }
  }
);

export const getApplicant = createAsyncThunk(
  "user/applicant/get",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await Client.get(`/user/applicant/${id}`);
      return data.data;
    } catch (error: any) {
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
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      if (action.payload.user.role !== "Admin") {
        state.order = action.payload.order;
        state.fields = action.payload.fields;
        state.template = action.payload.template;
        sessionStorage.setItem("order", JSON.stringify(action.payload.order));
        sessionStorage.setItem("fields", JSON.stringify(action.payload.fields));
        sessionStorage.setItem(
          "template",
          JSON.stringify(action.payload.template)
        );
      }
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
    builder.addCase(getApplicants.fulfilled, (state, action) => {
      state.loading = false;
      state.applicants = action.payload;
    });
    builder.addCase(getApplicants.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(getApplicants.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
    builder.addCase(getApplicant.fulfilled, (state, action) => {
      state.loading = false;
      state.applicant = action.payload;
    });
    builder.addCase(getApplicant.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(getApplicant.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
  },
});

export default userSlice.reducer;
