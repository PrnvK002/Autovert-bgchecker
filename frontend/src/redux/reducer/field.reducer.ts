import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../utils/axiosinstance.util";
import { fieldInitialState } from "../../types/fieldprop.type";

const initialState: fieldInitialState = {
  loading: false,
  err: "",
  fields: {},
  success: false,
};

export const getFields = createAsyncThunk(
  "feilds/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Client.get("/field");
      console.log("response from fields", data);
      return data.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateField = createAsyncThunk(
  "fields/udpate",
  async (payload:any, { rejectWithValue }) => {
    try {
      const { data } = await Client.post("/field/create", payload);
      console.log("response from update field", data);
      return data.fields;
    } catch (error: any) {
      console.log("error on udpatfied", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const fieldslice = createSlice({
  name: "field",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFields.fulfilled, (state, action) => {
      state.loading = false;
      state.fields = action.payload;
    });
    builder.addCase(getFields.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(getFields.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
    builder.addCase(updateField.fulfilled, (state, action) => {
      state.loading = false;
      state.fields = action.payload;
    });
    builder.addCase(updateField.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(updateField.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
  },
});

export const {resetSuccess} = fieldslice.actions;

export default fieldslice.reducer;
