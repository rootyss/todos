import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Spinner from '../spinner/Spinner.jsx';
import { getFormatedDate } from '../../utils/utils.js';
import useApi from '../../hooks/useApi.jsx';

const FastAddTask = ({ close }) => {
  const { t } = useTranslation();
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      content: '',
      description: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      content: Yup.string().trim().required(),
      description: Yup.string().trim(),
    }),
    onSubmit: async (values) => {
      try {
        const today = getFormatedDate(new Date(), '-');
        api.addTaskToFirebase({
          ...values, dateAdded: today, dateCompleted: null, priority: 1,
        });
        close();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.select();
  }, []);

  return (
    <form className="form-fast-add-task" onSubmit={formik.handleSubmit}>
      <div className="form-floating">
        <textarea
          className="add-task-field"
          type="text"
          name="content"
          required
          placeholder={t('placeholders.addTaskHeader')}
          onChange={formik.handleChange}
          value={formik.values.content}
          ref={textInput}
        />
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="add-task-field"
          type="text"
          name="description"
          placeholder={t('placeholders.addTaskDescription')}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </div>
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
        <button
          className="btn btn-primary"
          type="submit"
          variant="primary"
          onClick={close}
          disabled={formik.isSubmitting}
        >
          {t('buttons.cancel')}
        </button>
      </div>
    </form>
  );
};

export default FastAddTask;
