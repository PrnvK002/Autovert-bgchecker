import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../utils/axiosinstance.util";

const initialState = {
  loading: false,
  err: "",
  fields: {},
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

const fieldslice = createSlice({
  name: "field",
  initialState,
  reducers: {},
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
  },
});

export default fieldslice.reducer;
