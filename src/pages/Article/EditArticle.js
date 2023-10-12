import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Spin } from 'antd';
import axios from 'axios';

import ArticleForm from '../../components/ArticleForm/ArticleForm';

function EditArticle() {
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getArticle = useCallback(async (slug) => {
    setLoading(true);
    let config;
    try {
      const response = await axios.get(`/articles/${slug}`, config);
      const result = response.data.article;
      setCurrentArticle(result);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const fetchFunc = () => {
      getArticle(params.slug);
    };
    fetchFunc();
  }, [getArticle, params.slug]);
  if (loading) {
    return <Spin size="large" />;
  }
  return <ArticleForm editing article={currentArticle} />;
}

export default EditArticle;
