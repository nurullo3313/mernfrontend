import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  user: null,
  token: null,
  loading: false,
  status: null,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password },{rejectWithValue}) => {
    try {
      const res = await axios.post("/auth/register", {
        username,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (error) {
     return rejectWithValue(error.response?.data?.msg);
      
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password },{rejectWithValue}) => {
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (error) {
     return rejectWithValue(error.response?.data?.msg);
      
    }
  }
);

export const getMe = createAsyncThunk(
  "authgetMe",
 async (_,{rejectWithValue})=>{
    try{
        const res = await axios.get("/auth/me")
        return res.data
    }catch(error){
      return rejectWithValue(error.response.msg)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state)=>{
      state.user = null 
      state.token = null
      state.status = null
      state.loading= false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.msg;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        state.error = action.payload
      })



      .addCase(login.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.msg;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        state.error = action.payload
      })





      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.msg;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      });

      



  },
});


export const checkAuth = (state)=>Boolean(state.auth.token)
export const {logout} = authSlice.actions

export default authSlice.reducer;
