import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../../hooks/useApi.jsx';
import { getUser, updateUserData } from '../../store/userSlice.js';

const User = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useApi();
  const {
    uid,
    email,
    displayName = t('mainMenu.userAnonim'),
    firstname,
    surname,
  } = useSelector(getUser);

  const SigninSchema = yup.object({
    displayName: yup.string(t('errors.incorrectDisplayName')).required(t('errors.required')),
    firstname: yup.string(t('errors.incorrectFirstname')).required(t('errors.required')),
    surname: yup.string(t('errors.incorrectSurname')).required(t('errors.required')),
  });

  const handleOnBlur = (field) => (e) => {
    const { target: { value } } = e;
    dispatch(updateUserData({
      uid, field, value, db: api.database,
    }));
  };

  const formik = useFormik({
    initialValues: {
      displayName,
      firstname,
      surname,
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: async () => {

    },
  });

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header">
            <div className="view-header__content">
              <h1>{t('userSetting.header')}</h1>
            </div>
          </header>
          <div className="user-wrapper">
            <form className="w-100" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="" htmlFor="displayName">
                  Имя пользователя
                  <input
                    className=""
                    type="text"
                    id="displayName"
                    name="displayName"
                    autoComplete="displayName"
                    required
                    onBlur={handleOnBlur('displayName')}
                    placeholder={formik.values.displayName}
                    onChange={formik.handleChange}
                    value={formik.values.displayName}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="" htmlFor="firstname">
                  Имя
                  <input
                    className=""
                    type="text"
                    id="firstname"
                    name="firstname"
                    autoComplete="firstname"
                    required
                    onBlur={handleOnBlur('firstname')}
                    placeholder={formik.values.firstname}
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label className="" htmlFor="surname">
                  Фамилия
                  <input
                    className=""
                    type="text"
                    id="surname"
                    name="surname"
                    autoComplete="surname"
                    required
                    onBlur={handleOnBlur('surname')}
                    placeholder={formik.values.surname}
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                  />
                </label>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
