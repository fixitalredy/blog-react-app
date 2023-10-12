import React from 'react';

import ArticleList from '../../components/ArticleList/ArticleList';
import ArticlesPagination from '../../components/ArticlesPagination/ArticlesPagination';

function Main() {
  return (
    <>
      <ArticleList />
      <ArticlesPagination />
    </>
  );
}

export default Main;
