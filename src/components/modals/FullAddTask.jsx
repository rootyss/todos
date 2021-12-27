import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Spinner from '../spinner/Spinner.jsx';
import useApi from '../../hooks/useApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import Modal from './Modal.jsx';
import {
  getLabels, getCurrentLabels, addCurrentLabels, clearCurrentLabelsState,
} from '../../store/labelsSlice.js';

const Label = ({ id, label, handleAddCurrentLabel }) => {
  const currentLabels = useSelector(getCurrentLabels);
  const isAdded = !!currentLabels.find(({ key }) => key === id);

  const classnames = cn("control-tag label-item", {
    'label-item-disabled': isAdded,
  });

  return (
    <span onClick={!isAdded ? handleAddCurrentLabel : null} className={classnames}>
      {label}
    </span>
  );
};

const FullAddTask = ({ close }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useApi();
  const textArea = useRef(null);
  const auth = useAuth();
  const labelsUser = useSelector(getLabels);
  const currentLabels = useSelector(getCurrentLabels);

  const formik = useFormik({
    initialValues: {
      content: '',
      description: '',
      dateCompleted: `${new Date()}`,
      priority: 1,
      labelSearch: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      content: Yup.string().trim().required(),
      description: Yup.string().trim(),
      labelSearch: Yup.string().trim(),
    }),
    onSubmit: async (values) => {
      const date = new Date();
      const userUid = auth.getUserUid();
      const isCompleted = false;
      const {
        content, description, dateCompleted, priority,
      } = values;
      const labels = currentLabels;
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
        dispatch(clearCurrentLabelsState());
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    textArea.current.focus();
  }, []);

  const labelSearch = (str) => labelsUser.filter(({ label }) => label.includes(str));

  const handleAddCurrentLabel = (key, label) => () => {
    const currLabels = { key, label };
    return dispatch(addCurrentLabels({ currLabels }));
  };

  const renderCurrentLabels = (_labels) => {
    if (_labels.length <= 0) {
      return null;
    }
    return (
      <div className="current-labels-list">
        <span>{t('fullAddTask.addedLabels')}</span>
        {_labels.map(({ key, label }) => <span className="label-item current-label" key={key}>{label}</span>)}
      </div>
    );
  };
  const renderLabelsList = () => labelSearch(formik.values.labelSearch)
    .map(({ key, label }) => (
      <Label
        handleAddCurrentLabel={handleAddCurrentLabel(key, label)}
        id={key}
        key={key}
        label={label}
      />
    ));

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
            {renderCurrentLabels(currentLabels)}
            <span className="label-search">{t('fullAddTask.labelSearch')}</span>
            <input
              name="labelSearch"
              type="text"
              value={formik.values.labelSearch}
              onChange={formik.handleChange}
            />
            <div className="labels-list">
              {renderLabelsList()}
            </div>
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
      </Modal.Body>
    </Modal>
  );
};

export default FullAddTask;
