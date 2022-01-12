import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.jsx';
import {
  LOGIN_ROUTE, TODO_ROUTE,
} from '../../utils/constants.js';
import Spinner from '../spinner/Spinner.jsx';
import { getUser } from '../../store/userSlice.js';

const SignUpForm = ({ auth }) => {
  const [authFailed, setAuthFailed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const SigninSchema = yup.object({
    email: yup.string().email(t('errors.incorrectEmail')).required(t('errors.incorrectEmail')),
    password: yup.string().required(t('errors.requiredEmail')).min(6, t('errors.minPasswordLength')),
    chekpassword: yup.string().oneOf([yup.ref('password'), null], t('errors.passMatch')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      chekpassword: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { email, password } = values;
        const { user } = await createUserWithEmailAndPassword(auth.authFirebase, email, password);
        user.displayName = user.displayName ? user.displayName : t('mainMenu.userAnonim');
        const serUser = JSON.stringify(user);
        auth.logIn(serUser);
        return null;
      } catch (err) {
        setAuthFailed(true);
        setAuthError(err.code);
        return err;
      }
    },
  });

  const getClasses = (type) => {
    const mapType = {
      email: _.has(formik.errors, 'email'),
      password: _.has(formik.errors, 'password') || _.has(formik.errors, 'chekpassword'),
      chekpassword: _.has(formik.errors, 'chekpassword'),
    };
    return cn('form-control', {
      'is-invalid': mapType[type],
    });
  };

  const getErrors = () => _.toPairs(formik.errors).map(([name, message]) => (<div key={name} className="invalid-feedback">{message}</div>));
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <form className={`w-100${(!_.isEmpty(formik.errors) || authFailed) ? ' is-invalid-form' : ''}`} onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">{t('signupPage.heading')}</h1>
              <div className="form-floating mb-3">
                <input
                  className={getClasses('email')}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder={t('placeholders.email')}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  ref={inputRef}
                />
                <label className="form-label" htmlFor="email">{t('label.email')}</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className={getClasses('password')}
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder={t('placeholders.password')}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label className="form-label" htmlFor="password">{t('label.password')}</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className={getClasses('chekpassword')}
                  type="password"
                  id="chekpassword"
                  name="chekpassword"
                  autoComplete="current-password"
                  required
                  placeholder={t('placeholders.confirmpassword')}
                  onChange={formik.handleChange}
                  value={formik.values.chekpassword}
                />
                <label className="form-label" htmlFor="chekpassword">{t('label.confirmpassword')}</label>
              </div>
              {!_.isEmpty(formik.errors)
                ? getErrors()
                : null}
              {authFailed ? <div className="invalid-feedback">{t(`errors.${authError}`)}</div> : null}
              <button
                className="btn btn-primary"
                type="submit"
                variant="primary"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <Spinner /> : t('buttons.signup')}
              </button>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">{t('signupPage.alredyReg')}</span>
              <a href={LOGIN_ROUTE}>{t('signupPage.urlToLogin')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUp = () => {
  const auth = useAuth();
  const user = useSelector(getUser);
  return (
    user
      ? <Navigate to={TODO_ROUTE} />
      : <SignUpForm auth={auth} />
  );
};

export default SignUp;
