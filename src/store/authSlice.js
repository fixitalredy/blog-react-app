import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (registerData) => {
    try {
      const response = await axios.post('/users', {
        user: {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        },
      });
      return response.data.user;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const loginAuth = createAsyncThunk(
  'auth/login',
  async (registerData) => {
    try {
      const response = await axios.post('/users/login', {
        user: {
          email: registerData.email,
          password: registerData.password,
        },
      });
      return response.data.user;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const edit = createAsyncThunk('auth/edit', async (editData) => {
  try {
    const response = await axios.put('/user', {
      user: {
        email: editData.email,
        username: editData.username,
        password: editData.password,
        image: editData.avatar,
      },
    });
    return response.data.user;
  } catch (err) {
    throw err.response.data;
  }
});

const initialState = {
  isLogged: false,
  loggedPerson: null,
  logStatus: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload;
      if (state.isLogged) {
        state.loggedPerson = JSON.parse(localStorage.user);
      } else state.loggedPerson = null;
    },
    resetLogStatus: (state) => {
      state.logStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLogged = true;
        if (!action.payload.image) {
          action.payload.image =
            'https://static.productionready.io/images/smiley-cyrus.jpg';
        }
        state.loggedPerson = action.payload;
        localStorage.user = JSON.stringify(action.payload);
        state.logStatus = 'resolved';
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loggedPerson = action.payload;
        action.payload.image =
          'https://static.productionready.io/images/smiley-cyrus.jpg';
        localStorage.user = JSON.stringify(action.payload);
        state.logStatus = 'resolved';
      })
      .addCase(loginAuth.rejected, (state) => {
        state.logStatus = 'rejected';
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.loggedPerson = action.payload;
        localStorage.user = JSON.stringify(action.payload);
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
