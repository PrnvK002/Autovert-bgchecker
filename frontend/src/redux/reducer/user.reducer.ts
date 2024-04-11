import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../utils/axiosinstance.util";

const initialState = {
  user: {},
  loading: false,
  err: "",
  order: [],
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.order = action.payload.order;
    });
    builder.addCase(loginUser.pending, (state, _) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.err = action.payload;
    });
  },
});

export default userSlice.reducer;
