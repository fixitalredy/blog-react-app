import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../store/authSlice';
import { fetchArticles } from '../../store/articlesSlice';

function ArticleList() {
  const isLoggedSelector = (state) => state.authReducer.isLogged;
  const isLogged = useSelector(isLoggedSelector);
  const loggedPersonSelector = (state) => state.authReducer.loggedPerson;
  const loggedPerson = useSelector(loggedPersonSelector);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.setLogged(false));
    dispatch(fetchArticles());
    localStorage.removeItem('user');
  };
  return (
    <header className="header">
      <div className="header__content">
        <NavLink to="/articles" className="header__title">
          Realworld Blog
        </NavLink>
        {isLogged ? (
          <div className="header__profile">
            <NavLink
              to="/new-article"
              className="header__sign-button header__new-article"
              type="button"
            >
              Create article
            </NavLink>
            <NavLink to="/profile" className="header__profile-info">
              <div className="article__name name">{loggedPerson.username}</div>
              <img
                className="article__avatar avatar"
                src={
                  loggedPerson.image === ''
                    ? 'https://static.productionready.io/images/smiley-cyrus.jpg'
                    : loggedPerson.image
                }
                width="50"
                height="50"
                alt="avatar"
              />
            </NavLink>
            <NavLink
              to="/sign-in"
              className="header__sign-button header__logout"
              type="button"
              onClick={logoutHandler}
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <>
            <NavLink
              to="/sign-in"
              className="header__sign-button header__sign-button--in"
              type="button"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign-up"
              className="header__sign-button header__sign-button--up"
              type="button"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default ArticleList;
