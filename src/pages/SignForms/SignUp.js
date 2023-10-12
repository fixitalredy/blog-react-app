/* eslint-disable react-redux/useSelector-prefer-selectors */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './SignForms.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import { registerAuth } from '../../store/authSlice';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({});
  const logStatus = useSelector((state) => state.authReducer.logStatus);

  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (data) => {
    dispatch(registerAuth(data));
  };

  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  useEffect(() => {
    if (!logStatus) {
      setError(true);
    }
    if (logStatus === 'resolved') {
      history.replace('/articles');
      setError(false);
    }
  }, [dispatch, history, logStatus]);
  return (
    <div className="main__sign-container">
      <h2 className="main__sign-title">Create new account</h2>
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

        <label htmlFor="passwordReg">Password</label>
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
          id="passwordReg"
          placeholder="Password"
        />
        {errors.password && (
          <p className="main__sign-input-warning">{errors.password.message}</p>
        )}

        <label htmlFor="repPasswordReg">Repeat Password</label>
        <input
          {...register('repPassword', {
            required: 'This field is required',
            validate: () =>
              getValues('password') === getValues('repPassword') ||
              'Passwords must match',
          })}
          type="text"
          className={
            errors.repPassword
              ? 'main__sign-input--invalid'
              : 'main__sign-input'
          }
          id="repPasswordReg"
          placeholder="Repeat Password"
        />
        {errors.repPassword && (
          <p className="main__sign-input-warning">
            {errors.repPassword.message}
          </p>
        )}

        <label className="main__sign-checkbox-label" htmlFor="checkboxReg">
          <input
            {...register('checkbox', { required: 'Agreement is required' })}
            type="checkbox"
            className="main__sign-checkbox"
            id="checkboxReg"
          />
          I agree to the processing of my personal information
        </label>
        {errors.checkbox && (
          <p className="main__sign-input-warning">{errors.checkbox.message}</p>
        )}

        <input
          type="submit"
          className="main__sign-submit"
          id="sumbitReg"
          value="Create"
        />
        <p className="main__footer">
          Already have an account?{' '}
          <NavLink
            to="/sign-up"
            style={{ color: '#1890FF', textDecoration: 'none' }}
            href="213"
          >
            Sign In
          </NavLink>
          .
        </p>
        {error && (
          <Alert
            style={{ marginTop: '20px' }}
            type="error"
            message="Registration error"
            description="Unprocessable Content"
          />
        )}
      </form>
    </div>
  );
}

export default SignUp;
