/* eslint-disable react-redux/useSelector-prefer-selectors */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import format from 'date-fns/format';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Popconfirm } from 'antd';
import { uid } from 'uid';

import './ArticleItem.scss';
import { deleteArticle } from '../../../store/articlesSlice';
import { likeUnlikePost } from '../../../store/uiSlice';

function ArticleItem({
  title,
  description,
  favoritesCount,
  tagList,
  author,
  createdAt,
  slug,
  detailed,
  favorited,
  body,
}) {
  const user = useSelector((state) => state.authReducer.loggedPerson);
  const isLogged = useSelector((state) => state.authReducer.isLogged);
  const dispatch = useDispatch();
  const history = useHistory();
  const [liked, setLiked] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);

  const filteredTagList = tagList.filter(
    (tag) => tag.length !== 0 && tag !== ' '
  );

  const classnamesArticle = classNames('article', {
    articles__article: !detailed,
    main__article: detailed,
  });
  const classnamesTag = classNames('article__tag', {
    'article__tag--detailed': detailed,
  });
  const classnamesDescription = classNames('article__description', {
    'article__description--detailed': detailed,
  });

  const tags = filteredTagList.map((tag) => (
    <div className={classnamesTag} key={uid()}>
      {tag}
    </div>
  ));

  const deleteHandler = () => {
    dispatch(deleteArticle(slug));
    history.replace('/articles');
  };
  const likeHandler = () => {
    if (isLogged) {
      if (!liked) {
        dispatch(likeUnlikePost({ slug, isLiked: false }));
        setCount(count + 1);
      }
      if (liked) {
        dispatch(likeUnlikePost({ slug, isLiked: true }));
        setCount(count - 1);
      }
      setLiked(!liked);
    }
  };
  const cutDescription = (desc) => {
    if (desc.length < 221) {
      return desc;
    }
    const newDesc = desc.substring(0, 221);
    return `${newDesc.slice(0, newDesc.lastIndexOf(' '))}...`;
  };
  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  // eslint-disable-next-line quotes
  return (
    <article className={classnamesArticle}>
      <div className="article__header">
        <div className="article__meta">
          <div className="article__subheader">
            <Link className="article__title" to={`/articles/${slug}`}>
              {title}
            </Link>
            <button
              type="button"
              className={liked ? 'article__like' : 'article__like--unliked'}
              onClick={() => likeHandler()}
            >
              {count}
            </button>
          </div>
          <div className="article__tags"> {tags}</div>
          <div className={classnamesDescription}>
            {cutDescription(description)}
          </div>
        </div>
        <div className="article__right-column">
          <div className="article__profile-info">
            <div className="article__text">
              <div className="article__name name">{author.username}</div>
              <div className="article__date">{formatedDate}</div>
            </div>
            <img
              className="article__avatar avatar"
              src={`${author.image}`}
              width="50"
              height="50"
              alt="avatar"
            />
          </div>
          {user
            ? detailed &&
              author.username === user.username && (
                <div className="article__functional">
                  <Popconfirm
                    title="Delete the article"
                    description="Are you sure to delete this article?"
                    onConfirm={deleteHandler}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button
                      className="header__delete-button header-button"
                      type="button"
                    >
                      Delete
                    </button>
                  </Popconfirm>
                  <Link
                    to={`/${slug}/edit`}
                    className="header__edit-button header-button"
                    type="button"
                  >
                    Edit
                  </Link>
                </div>
              )
            : null}
        </div>
      </div>
      <ReactMarkdown className="article__body" remarkPlugins={[remarkGfm]}>
        {body}
      </ReactMarkdown>
    </article>
  );
}
ArticleItem.defaultProps = {
  classname: '',
};

export default ArticleItem;
