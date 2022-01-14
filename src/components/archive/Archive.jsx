import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTasks } from '../../store/tasksSlice.js';
import Task from '../task/Task.jsx';
import { openModal } from '../../store/modalSlice.js';
import { modalTypes } from '../../utils/constants.js';

const Archive = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const currentTasks = tasks.filter(({ isCompleted }) => isCompleted);

  const handleViewTask = (taskId) => () => dispatch(openModal({
    type: modalTypes.fullTask,
    taskId,
  }));

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header border-bottom">
            <h1>{t('archivePage.header')}</h1>
          </header>
          <ul className="listbox-list">
            {currentTasks.map(({
              addedBbyUid,
              assignedByUid,
              content,
              dateAdded,
              dateCompleted,
              dayOrder,
              description,
              id,
              labels = [],
              priority,
              isCompleted,
            }) => (
              <li key={id} className="task-list-item">
                <Task
                  handleViewTask={handleViewTask(id)}
                  addedBbyUid={addedBbyUid}
                  assignedByUid={assignedByUid}
                  content={content}
                  dateAdded={dateAdded}
                  dateCompleted={dateCompleted}
                  dayOrder={dayOrder}
                  description={description}
                  id={id}
                  labels={labels}
                  priority={priority}
                  isCompleted={isCompleted}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Archive;
