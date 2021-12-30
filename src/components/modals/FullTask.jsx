import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Modal from './Modal.jsx';
import Task from '../task/Task.jsx';
import { getCurrentTask, getCurrentTabDetailsName, setCurrentTabDetailsName } from '../../store/tasksSlice.js';
import SubTasks from '../details/SubTasks.jsx';
import Comments from '../details/Comments.jsx';
import Activity from '../details/Activity.jsx';

const ViewTask = () => {
  const { t } = useTranslation();
  const task = useSelector(getCurrentTask);
  const dispatch = useDispatch();
  const {
    content, description, dateAdded, dateCompleted, priority, labels,
  } = task;
  const currentTabDetailsName = useSelector(getCurrentTabDetailsName);

  const handleTabClick = (name) => () => {
    dispatch(setCurrentTabDetailsName(name));
  };

  const tabTypes = {
    'sub-tasks': <SubTasks />,
    comments: <Comments />,
    activity: <Activity />,
  };

  const classnamesSubTusks = cn('task-details-button task-tab', {
    'task-details-button--active': currentTabDetailsName === 'sub-tasks',
  });
  const classnamesComments = cn('task-details-button task-tab', {
    'task-details-button--active': currentTabDetailsName === 'comments',
  });
  const classnamesActivity = cn('task-details-button task-tab', {
    'task-details-button--active': currentTabDetailsName === 'activity',
  });

  return (
    <>
      <Task
        content={content}
        dateAdded={dateAdded}
        dateCompleted={dateCompleted}
        description={description}
        labels={labels}
        priority={priority}
      />
      <div className="task-details">
        <div role="tablist" className="task-details--buttons">
          <button
            type="button"
            aria-selected="false"
            role="tab"
            className={classnamesSubTusks}
            onClick={handleTabClick({ name: 'sub-tasks' })}
          >
            {t('modals.sub_tasks')}
          </button>
          <button
            type="button"
            aria-selected="false"
            role="tab"
            className={classnamesComments}
            onClick={handleTabClick({ name: 'comments' })}
          >
            {t('modals.comments')}
          </button>
          <button
            type="button"
            aria-selected="false"
            role="tab"
            className={classnamesActivity}
            onClick={handleTabClick({ name: 'activity' })}
          >
            {t('modals.activity')}
          </button>
        </div>
        <div className="task-details-body">
          {tabTypes[currentTabDetailsName]}
        </div>
      </div>
    </>
  );
};

const FullTask = ({ close }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const closeFullTask = () => {
    close();
    navigate(-1);
  };

  return (
    <Modal close={closeFullTask}>
      <Modal.Header>
        <Modal.Header.H>{t('modals.fullTaskHeader')}</Modal.Header.H>
        <Modal.Header.ButtonClose close={closeFullTask} />
      </Modal.Header>
      <Modal.Body>
        <ViewTask />
      </Modal.Body>
    </Modal>
  );
};

export default FullTask;
