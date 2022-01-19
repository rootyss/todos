import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import * as Yup from 'yup';
import useApi from '../../hooks/useApi.jsx';
import Spinner from '../spinner/Spinner.jsx';
import { getLabels } from '../../store/labelsSlice.js';
import Label from '../label/Label.jsx';
import { getUser } from '../../store/userSlice.js';

const Labels = () => {
  const { t } = useTranslation();
  const user = useSelector(getUser);
  const userUid = user.uid;
  const api = useApi();
  const textArea = useRef(null);
  const labelsUser = useSelector(getLabels);

  const formik = useFormik({
    initialValues: {
      labls: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      labls: Yup.string().trim().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { labls } = values;
      const labels = labls.replace(/\s+/g, '').split(',');
      try {
        labels.forEach((label) => {
          if (label.length <= 0) return;
          api.addLabelToFirebase({ label: label.toLowerCase(), userUid });
        });
        resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    textArea.current.focus();
  }, []);

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header border-bottom">
            <h1>{t('labelsPage.header')}</h1>
          </header>
          <div className="labels-list">
            {labelsUser.map(({ label }) => <Label key={label} label={label} />)}
          </div>
          <form className="mb-3">
            <textarea
              className="add-task-field"
              type="text"
              name="labls"
              required
              placeholder={t('placeholders.addLabels')}
              onChange={formik.handleChange}
              value={formik.values.labls}
              ref={textArea}
            />
            <div className="form-fast-add-task-buttons">
              <button
                className="btn btn-primary"
                type="submit"
                variant="primary"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <Spinner /> : t('buttons.add')}
              </button>
            </div>
          </form>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Labels;
