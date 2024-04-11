import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../utils/axiosinstance.util";
import { TemplateState, Template } from "../../types/template.type";

const initialState: TemplateState = {
  loading: false,
  err: "",
  template: {},
  success: false,
};

export const getTemplate = createAsyncThunk(
  "template/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Client.get("/template");
      console.log("response from templates", data);
      return data.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "template/update",
  async (payload: Template, { rejectWithValue }) => {
    try {
      const { data } = await Client.post("/template/create", payload);
      console.log("response from create templates", data);
      return data.template;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplate.fulfilled, (state, action) => {
      state.loading = false;
      state.template = action.payload;
    });
    builder.addCase(getTemplate.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(getTemplate.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
    builder.addCase(updateTemplate.fulfilled, (state, action) => {
      state.loading = false;
      state.template = action.payload;
      state.success = true;
    });
    builder.addCase(updateTemplate.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(updateTemplate.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
  },
});

export default templateSlice.reducer;

export const {resetSuccess} = templateSlice.actions;