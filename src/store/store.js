import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlesSlice from './articlesSlice';
import authSlice from './authSlice';
import uiSlice from './uiSlice';

const rootReducer = combineReducers({
  articlesReducer: articlesSlice.reducer,
  uiReducer: uiSlice.reducer,
  authReducer: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
