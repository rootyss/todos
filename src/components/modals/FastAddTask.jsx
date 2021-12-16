import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Spinner from '../spinner/Spinner.jsx';

const FastAddTask = ({ close }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      headerTask: '',
      description: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      headerTask: Yup.string().trim().required(),
      description: Yup.string().trim(),
    }),
    onSubmit: async () => {
      try {
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className=""
            type="text"
            name="headerTask"
            required
            placeholder="text"
            onChange={formik.handleChange}
            value={formik.values.headerTask}
            ref={textInput}
          />
        </div>
        <div className="form-floating mb-3">
          <input
            className=""
            type="text"
            name="description"
            placeholder="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            variant="primary"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner /> : t('buttons.create')}
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
    </div>
  );
};

export default FastAddTask;
