import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Spinner from '../spinner/Spinner.jsx';
import useApi from '../../hooks/useApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import Modal from './Modal.jsx';

const FastAddTaskForm = ({ close }) => {
  const { t } = useTranslation();
  const api = useApi();
  const { user } = useAuth();

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
      const userUid = user.uid;
      const date = new Date();
      try {
        api.addTaskToFirebase({
          ...values,
          addedByUid: userUid,
          dateAdded: `${date}`,
          dateCompleted: `${date}`,
          priority: 4,
          isCompleted: false,
          labels: [],
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

const FastAddTask = ({ close }) => {
  const { t } = useTranslation();
  return (
    <Modal close={close}>
      <Modal.Header>
        <Modal.Header.H>{t('modals.addTaskHeader')}</Modal.Header.H>
        <Modal.Header.ButtonClose close={close} />
      </Modal.Header>
      <Modal.Body>
        <FastAddTaskForm close={close} />
      </Modal.Body>
    </Modal>
  );
};

export default FastAddTask;
