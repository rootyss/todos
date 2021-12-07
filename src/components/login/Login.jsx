import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';
import {
  REG_ROUTE,
} from '../../utils/constants.js';

const LogInForm = ({ auth }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const [authFailed, setAuthFailed] = useState(false);

  const SigninSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { email, password } = values;
        const { user } = await signInWithEmailAndPassword(auth.authFirebase, email, password);
        auth.logIn(user);
      } catch (err) {
        setAuthFailed(false);
        console.log(err);
        throw err;
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <form className="w-100" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Почта"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  ref={inputRef}
                />
                <label className="form-label" htmlFor="email">Почта</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label className="form-label" htmlFor="password">Пароль</label>
                {/* {authFailed ? <Form.Control.Feedback type="invalid">{t('errors.unauthorized')}</Form.Control.Feedback> : null } */}
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                variant="primary"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                Войти
              </button>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">Не зарегистрированы? </span>
              <a href={REG_ROUTE}>Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Navigate to="/todo" />
      : <LogInForm auth={auth} />
  );
};

export default Login;
