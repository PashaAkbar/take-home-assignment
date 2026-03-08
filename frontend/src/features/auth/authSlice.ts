/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/axios';

export const login = createAsyncThunk(
  'auth/login',
  async (data: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const res = await api.post('/dashboard/v1/auth/login', data);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    error: null as string | null,
  },

  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;

      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action: any) => {
      state.error = action.payload;
    });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
