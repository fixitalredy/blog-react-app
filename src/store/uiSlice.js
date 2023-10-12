/* eslint-disable prefer-destructuring */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { articlesActions } from './articlesSlice';

axios.defaults.baseURL = 'https://blog.kata.academy/api';
axios.defaults.headers['Content-Type'] = 'application/json';

export const likeUnlikePost = createAsyncThunk(
  'ui/likeOrUnlike',
  async ({ slug, isLiked }, { getState, dispatch }) => {
    const token = getState().authReducer.loggedPerson.token;
    const method = isLiked ? 'delete' : 'post';
    try {
      const response = await axios[method](
        `/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(articlesActions.setLikedPost(response.data.article));
      return response.data.article;
    } catch (err) {
      throw err.response.data;
    }
  }
);
const initialState = { likeStatus: null };
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeUnlikePost.pending, (state) => {
        state.likeStatus = 'pending';
      })
      .addCase(likeUnlikePost.fulfilled, (state) => {
        state.likeStatus = 'resolved';
      });
  },
});
export default uiSlice;
