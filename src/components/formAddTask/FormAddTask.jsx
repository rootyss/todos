import React, { useEffect, useRef } from 'react';
import { Formik, useFormikContext, useField } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth.jsx';
import useApi from '../../hooks/useApi.jsx';
import {
  getLabels, getCurrentLabels, addCurrentLabels, clearCurrentLabelsState, deleteCurrentLabel,
} from '../../store/labelsSlice.js';
import Spinner from '../spinner/Spinner.jsx';

import "react-datepicker/dist/react-datepicker.css";

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

const Calendar = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const { name } = props;
  return (
    <DatePicker
      name={name}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

const FormAddTask = ({ close }) => {
  const dispatch = useDispatch();
  const initialValues = {
    content: '',
    description: '',
    dateCompleted: new Date(),
    priority: 0,
    labelSearch: '',
  };
  const api = useApi();
  const textArea = useRef(null);
  const auth = useAuth();
  const labelsUser = useSelector(getLabels);
  const currentLabels = useSelector(getCurrentLabels);
  const { t } = useTranslation();

  const labelSearch = (str) => labelsUser.filter(({ label }) => label.includes(str));

  const handleAddCurrentLabel = (key, label) => () => {
    const currLabels = { key, label };
    return dispatch(addCurrentLabels({ currLabels }));
  };

  const renderCurrentLabels = (_labels) => {
    const dispatch = useDispatch();

    if (_labels.length <= 0) {
      return null;
    }
    const handleDeleteLabel = (id) => () => {
      dispatch(deleteCurrentLabel({ id }));
    };

    return (
      <div className="current-labels-list">
        <span>{t('fullAddTask.addedLabels')}</span>
        {_labels.map(({ key, label }) => <span onClick={handleDeleteLabel(key)} className="label-item current-label" key={key}>{label}</span>)}
      </div>
    );
  };
  const renderLabelsList = (labelsList) => labelSearch(labelsList)
    .map(({ key, label }) => (
      <Label
        handleAddCurrentLabel={handleAddCurrentLabel(key, label)}
        id={key}
        key={key}
        label={label}
      />
    ));

  useEffect(() => {
    textArea.current.focus();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        content: Yup.string().trim().required(),
        description: Yup.string().trim(),
        labelSearch: Yup.string().trim(),
      })}
      validateOnChange={false}
      onSubmit={async (values) => {
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
            dateCompleted: `${dateCompleted}`,
            priority: priority || 4,
            dateAdded: `${date}`,
            isCompleted,
            labels,
          });
          close();
          dispatch(clearCurrentLabelsState());
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form-add-task">
          <div className="form-floating">
            <textarea
              className="add-task-field"
              type="text"
              name="content"
              required
              placeholder={t('placeholders.addTaskHeader')}
              onChange={props.handleChange}
              value={props.values.content}
              ref={textArea}
            />
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="add-task-field"
              type="text"
              name="description"
              placeholder={t('placeholders.addTaskDescription')}
              onChange={props.handleChange}
              value={props.values.description}
            />
          </div>
          <div className="form-floating mb-3">
            <select
              name="priority"
              value={props.values.priority}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ display: 'block' }}
            >
              <option value="0" label={t('fullAddTask.selectPriority')} />
              <option value="1" label="1" />
              <option value="2" label="2" />
              <option value="3" label="3" />
              <option value="4" label="4" />
            </select>
          </div>
          <div className="form-floating mb-3">
            {renderCurrentLabels(currentLabels)}
            <span className="label-search">{t('fullAddTask.labelSearch')}</span>
            <input
              name="labelSearch"
              type="text"
              value={props.values.labelSearch}
              onChange={props.handleChange}
            />
            <div className="labels-list">
              {renderLabelsList(props.values.labelSearch)}
            </div>
          </div>
          <div className="form-floating mb-3">
            <Calendar name="dateCompleted" />
          </div>
          <div className="form-fast-add-task-buttons">
            <button
              className="btn btn-primary"
              type="submit"
              variant="primary"
              onClick={props.handleSubmit}
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? <Spinner /> : t('buttons.add')}
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              variant="primary"
              onClick={close}
              disabled={props.isSubmitting}
            >
              {t('buttons.cancel')}
            </button>
          </div>
        </form>
      )}
    </Formik>

  );
};

export default FormAddTask;
