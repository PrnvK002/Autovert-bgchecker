import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../utils/axiosinstance.util";
import { VersionState } from "../../types/version.type";

const initialState: VersionState = {
  loading: false,
  err: "",
  success: false,
  version: {},
};

export const getVersion = createAsyncThunk(
  "version/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Client.get("/version");
      console.log("version info", data);
      return data.data;
    } catch (error: any) {
      console.log("error", error);
      rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "version/update",
  async (payload: any, { rejectWithValue }) => {
    try {
      console.log("payload of order", payload);

      const { data } = await Client.post("/version/order", payload);
      console.log("response data from updateorder", data);
      return data.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const versionSlice = createSlice({
  name: "Version",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVersion.fulfilled, (state, action) => {
      state.version = action.payload;
      state.loading = false;
    });
    builder.addCase(getVersion.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getVersion.rejected, (state, action: any) => {
      state.err = action.payload;
      state.loading = false;
    });
    builder.addCase(updateOrder.fulfilled, (state, _) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateOrder.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.rejected, (state, action: any) => {
      state.err = action.payload;
      state.loading = false;
    });
  },
});

export default versionSlice.reducer;
