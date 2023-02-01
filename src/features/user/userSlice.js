import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch, privateFetch } from "../../utils/axios";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  isLoggedin: false,
  status: false,
  access_token: "",
  expire: "",
  isNavLoading: false,
  user: {},
};
export const userRegister = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/users/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "users/login",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/users/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk("/users", async (token, thunkAPI) => {
  try {
    const user = await privateFetch.get("/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return user.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const userLogout = createAsyncThunk(
  "/users/logout",
  async (thunkAPI) => {
    try {
      const resp = await customFetch.delete("/users/logout");
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
      state.isLoading = false;
      state.status = false;
      state.user = {};
    },
  },
  extraReducers: {
    //UserRegister
    [userRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.status = true;
      toast.success("Registration successful. Please sign your account");
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(`Registration fail reason : ${payload}`);
    },
    // userLogin
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedin = true;
      state.status = "success";
      state.access_token = payload.accessToken;
      toast.success("Sign in successful");
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(`Login fail:${payload}`);
    },
    // getuser
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoggedin = true;
      console.log('here')
      state.user = { user: payload.user };
    },
    [userLogout.pending]: (state) => {
      state.isNavLoading = true;
    },
    [userLogout.fulfilled]: (state, { payload }) => {
      state.isLoggedin = false;
      state.isNavLoading = false;
      state.access_token = "";
      state.user = {};
      toast.success("Log out Successfully");
    },
    [userLogout.rejected]: (state, { payload }) => {
      toast.error("refresh page");
    },
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
