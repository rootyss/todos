import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../spinner/Spinner.jsx';
import useApi from '../../hooks/useApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import Modal from './Modal.jsx';

const FullAddTask = ({ close }) => {
  const { t } = useTranslation();
  const api = useApi();
  const textArea = useRef(null);
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      content: '',
      description: '',
      dateCompleted: `${new Date()}`,
      labls: '',
      priority: 1,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      content: Yup.string().trim().required(),
      description: Yup.string().trim(),
      labls: Yup.string().trim(),
    }),
    onSubmit: async (values) => {
      const date = new Date();
      const userUid = auth.getUserUid();
      const isCompleted = false;
      const {
        labls, content, description, dateCompleted, priority,
      } = values;
      const labels = labls.replace(/\s+/g, '').split(',');

      try {
        api.addTaskToFirebase({
          addedByUid: userUid,
          content,
          description,
          dateCompleted,
          priority,
          dateAdded: `${date}`,
          isCompleted,
          labels,
        });
        close();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    textArea.current.focus();
  }, []);

  return (
    <Modal close={close}>
      <Modal.Header>
        <Modal.Header.H>{t('modals.addTaskHeader')}</Modal.Header.H>
        <Modal.Header.ButtonClose close={close} />
      </Modal.Header>
      <Modal.Body>
        <form className="form-add-task">
          <div className="form-floating">
            <textarea
              className="add-task-field"
              type="text"
              name="content"
              required
              placeholder={t('placeholders.addTaskHeader')}
              onChange={formik.handleChange}
              value={formik.values.content}
              ref={textArea}
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
          <div className="form-floating mb-3">
            <textarea
              className="add-task-field"
              type="text"
              name="labls"
              placeholder={t('placeholders.labls')}
              onChange={formik.handleChange}
              value={formik.values.labls}
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
              onClick={(e) => { e.stopPropagation(); close(); }}
              disabled={formik.isSubmitting}
            >
              {t('buttons.cancel')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FullAddTask;
