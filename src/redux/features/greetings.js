import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import types from '../types';

export const fetchGreeting = createAsyncThunk(
  types.FETCH_GREETING,
  async () => {
    const response = await axios.get('http://localhost:3000/greetings');
    return response.data;
  },
);

// Initial state
const initialState = {
  greetings: [],
  error: null,
  status: 'idle',
};

const greetingsSlice = createSlice({
  name: 'greetings',
  initialState,
  reducers: {
    greeting(state, action) {
      const st = state;
      st.greetings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        const st = state;
        st.status = 'loading';
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        const st = state;
        st.status = 'succeeded';
        st.greetings = action.payload;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        const st = state;
        st.status = 'rejected';
        st.error = action.error.message;
      });
  },
});

export const { greeting } = greetingsSlice.actions;
export default greetingsSlice.reducer;
