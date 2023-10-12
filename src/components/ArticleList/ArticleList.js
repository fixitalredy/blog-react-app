/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react';
import { useSelector } from 'react-redux';
import { uid } from 'uid';
import { Spin } from 'antd';

import './ArticleList.scss';

import ArticleItem from './ArticleItem/ArticleItem';

function ArticleList() {
  const articles = useSelector((state) => state.articlesReducer.articles);
  const status = useSelector((state) => state.articlesReducer.status);

  const articlesList = articles.map((article) => (
    <ArticleItem
      key={uid()}
      title={article.title}
      description={article.description}
      favoritesCount={article.favoritesCount}
      tagList={article.tagList}
      author={article.author}
      createdAt={article.createdAt}
      slug={article.slug}
      favorited={article.favorited}
      detailed={false}
    />
  ));
  return (
    <article className="articles">
      {status === 'loading' ? (
        <Spin style={{ marginTop: '20vh' }} size="large" />
      ) : (
        articlesList
      )}
    </article>
  );
}

export default ArticleList;
