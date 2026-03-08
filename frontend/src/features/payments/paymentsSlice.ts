import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/axios';

export const fetchPayments = createAsyncThunk(
  'payments/fetch',
  async (status?: string) => {
    const url = status
      ? `/dashboard/v1/payments?status=${status}`
      : '/dashboard/v1/payments';

    const res = await api.get(url);

    console.log('API RESPONSE:', res.data);

    return res.data;
  },
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(fetchPayments.pending, (state) => {
     state.loading = true;
   });

   builder.addCase(fetchPayments.fulfilled, (state, action) => {
     state.data = action.payload.payments;
     state.loading = false;
   });

   builder.addCase(fetchPayments.rejected, (state) => {
     state.loading = false;
   });
  },
});

export default paymentsSlice.reducer;
