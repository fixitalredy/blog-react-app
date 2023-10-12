import React from 'react';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';

import { fetchArticles } from '../../store/articlesSlice';

function ArticlesPagination() {
  const dispatch = useDispatch();
  const pageHandler = (key) => {
    dispatch(fetchArticles(key));
  };
  return (
    <Pagination
      defaultCurrent={1}
      total={100}
      style={{ marginTop: '40px' }}
      onChange={pageHandler}
      showSizeChanger={false}
    />
  );
}

export default ArticlesPagination;
