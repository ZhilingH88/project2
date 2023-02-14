import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";
const initialState = {
  isNavLoading: false,
  isLoading:false,
  status: false,
};
export const userRegister = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/use/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const userLogout = createAsyncThunk(
  "/users/logout",
  async (thunkAPI) => {
    try {
      const resp = await customFetch.delete("/user/logout");
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isNavLoading = false;
      state.status = false;
    },
    setLoading: (state, { payload }) => {
      state.isNavLoading = payload.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = true;
        toast.success("Registration successful. Please sign in your account");
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(`registration failed: ${payload}`);
      })
      .addCase(userLogout.pending, (state) => {
        state.isNavLoading = true;
      })
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        state.isNavLoading = false;
        toast.success("Log out Successfully");
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.isNavLoading = false;
        console.log(payload);
      });
  },
});

export const { resetState, setLoading } = userSlice.actions;
export default userSlice.reducer;
