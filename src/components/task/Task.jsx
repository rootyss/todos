import React from 'react';
import { update, ref } from "firebase/database";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import getFormatedDate from '../../utils/utils.js';
import Label from '../label/Label.jsx';
import {
  FIREBASE_TASKS_ROUTE,
  modalTypes,
} from '../../utils/constants.js';
import useApi from '../../hooks/useApi.jsx';
import Actions from '../actions/Actions.jsx';
import { openModal } from '../../store/modalSlice.js';

const Task = ({
  id,
  content,
  dateAdded,
  dateCompleted,
  description,
  labels = [],
  priority,
  isCompleted,
}) => {
  const dispatch = useDispatch();
  const api = useApi();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isOpen = useSelector((state) => state.modal.isOpen);

  const handleCompleted = () => {
    const taskRef = ref(api.database, `${FIREBASE_TASKS_ROUTE}/${id}`);
    setTimeout(() => update(taskRef, { isCompleted: true }), 1000);
  };

  const handleViewTask = (taskId) => () => {
    if (isOpen) {
      return;
    }
    dispatch(openModal({
      type: modalTypes.fullTask,
      taskId,
    }));
    navigate(`/task/${taskId}`, { state: { backgroundLocation: location } });
  };

  return (
    <div className="task-list-item__body">
      <div className="task-list-item__child" />
      {isCompleted ? null : (
        <button onClick={handleCompleted} type="button" role="checkbox" className="task-checkbox" aria-checked="false">
          <div className="task_checkbox__circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z" />
            </svg>
          </div>
        </button>
      )}
      <div className="task-list-item__content" role="button" onClick={handleViewTask(id)} tabIndex="0">
        <div className="task-list-item__content__wrapper">
          <div className="task-content">
            {content}
          </div>
          <div className="task-description">
            {description}
          </div>
        </div>
        <div className="task-list-item__infotags">
          <span className="control-tag">{getFormatedDate(dateAdded, '-')}</span>
          <span className="control-tag">{getFormatedDate(dateCompleted, '-')}</span>
          <span className={`control-tag priority-tag priority-tag-${priority}`} />
          <div className="d-flex" onClick={(e) => e.stopPropagation()}>{labels.map(({ key, label }) => <Label key={key} label={label} />)}</div>
        </div>
      </div>
      <Actions>
        <Actions.Comments id={id}>{t('inbox.comments')}</Actions.Comments>
      </Actions>
    </div>
  );
};

export default Task;
