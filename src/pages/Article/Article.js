/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import './ArticleDetails.scss';
import ArticleItem from '../../components/ArticleList/ArticleItem/ArticleItem';
// 1wqe

function Article() {
  const params = useParams();

  const loggedPerson = useSelector((state) => state.authReducer.loggedPerson);

  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const getArticle = useCallback(
    async (slug) => {
      setLoading(true);
      let config;
      if (loggedPerson) {
        config = {
          headers: {
            Authorization: `Bearer ${loggedPerson.token}`,
          },
        };
      }
      try {
        const response = await axios.get(`/articles/${slug}`, config);
        const result = response.data.article;
        setCurrentArticle(result);
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [loggedPerson]
  );
  useEffect(() => {
    const fetchFunc = () => {
      getArticle(params.slug);
    };
    fetchFunc();
  }, [getArticle, params.slug]);

  if (currentArticle && !loading) {
    return (
      <ArticleItem
        title={currentArticle.title}
        description={currentArticle.description}
        favoritesCount={currentArticle.favoritesCount}
        tagList={currentArticle.tagList}
        author={currentArticle.author}
        createdAt={currentArticle.createdAt}
        slug={currentArticle.slug}
        body={currentArticle.body}
        favorited={currentArticle.favorited}
        detailed
      />
    );
  }
  if (loading) {
    return <Spin style={{ marginTop: '20vh' }} size="large" />;
  }
}

export default Article;
