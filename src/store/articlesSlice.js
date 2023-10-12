/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://blog.kata.academy/api/';
if (localStorage.user) {
  axios.defaults.headers = {
    Authorization: `Bearer ${JSON.parse(localStorage.user).token}`,
  };
}
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page = 1, { rejectWithValue }) => {
    let config;
    try {
      const response = await axios.get(
        `/articles/?limit=5&offset=${page * 5 - 5}`,
        config
      );
      const result = response.data.articles;
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
    return null;
  }
);
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (creationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/articles/', {
        article: {
          title: creationData.title,
          body: creationData.text,
          description: creationData.description,
          tagList: creationData.tags,
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
    return null;
  }
);
export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ updatedData, slug }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/articles/${slug}`, {
        article: {
          title: updatedData.title,
          body: updatedData.text,
          description: updatedData.description,
          tagList: updatedData.tags,
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
    return null;
  }
);
export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/articles/${slug}`);
      const result = response.data;
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
    return null;
  }
);

const initialState = {
  status: null,
  articles: [],
  error: null,
  articlePost: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticlePost: (state) => {
      state.articlePost = null;
    },
    setLikedPost: (state, action) => {
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          return action.payload;
        }
        return article;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(updateArticle.rejected, (state) => {
        state.articlePost = 'rejected';
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.articlePost = 'resolved';
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.articlePost = 'resolved';
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.articlePost = 'rejected';
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.articlePost = 'resolved';
      });
  },
});

export const articlesActions = articlesSlice.actions;
export default articlesSlice;
