/* eslint-disable react-redux/useSelector-prefer-selectors */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import './SignForms.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

import { edit } from '../../store/authSlice';

function Edit() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.authReducer.isLogged);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    avatar: null,
    email: null,
    password: null,
    username: null,
  });
  const submitHandler = (data) => {
    dispatch(edit(data));
  };
  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  if (!isLogged) {
    return <Redirect to="/sign-in" />;
  }
  return (
    <div className="main__sign-container">
      <h2 className="main__sign-title">Edit Profile</h2>
      <form
        className="main__sign-up-form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="usernameReg">Username</label>
        <input
          {...register('username', {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 4 characters',
            },
            maxLength: {
              value: 20,
              message: 'Max username length is 20 characters',
            },
          })}
          type="text"
          className={
            errors.username ? 'main__sign-input--invalid' : 'main__sign-input'
          }
          id="usernameReg"
          placeholder="Username"
        />
        {errors.username && (
          <p className="main__sign-input-warning">{errors.username.message}</p>
        )}

        <label htmlFor="emailReg">Email address</label>
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: regEmail,
              message: 'Invalid email format',
            },
          })}
          type="text"
          className={
            errors.email ? 'main__sign-input--invalid' : 'main__sign-input'
          }
          id="emailReg"
          placeholder="Email address"
        />
        {errors.email && (
          <p className="main__sign-input-warning">{errors.email.message}</p>
        )}

        <label htmlFor="password">New password</label>
        <input
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Max password length is 40 characters',
            },
          })}
          type="text"
          className={
            errors.password ? 'main__sign-input--invalid' : 'main__sign-input'
          }
          id="passwor"
          placeholder="New password"
        />
        {errors.password && (
          <p className="main__sign-input-warning">{errors.password.message}</p>
        )}

        <label htmlFor="avatar">Avatar image (url)</label>
        <input
          {...register('avatar')}
          type="text"
          className={
            errors.avatar ? 'main__sign-input--invalid' : 'main__sign-input'
          }
          id="avatar"
          placeholder="Avatar image"
        />
        {errors.avatar && (
          <p className="main__sign-input-warning">{errors.avatar.message}</p>
        )}
        <input
          type="submit"
          className="main__sign-submit"
          id="sumbit"
          value="Save"
        />
      </form>
    </div>
  );
}

export default Edit;
