import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../task/Task.jsx';
import { openModal, getModalInfo } from '../../store/modalSlice.js';
import { getTasks } from '../../store/tasksSlice.js';
import { modalTypes } from '../../utils/constants.js';
import ModalWindow from '../modals/index.jsx';

const Inbox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const modalInfo = useSelector(getModalInfo);
  const { type, isOpen } = modalInfo;

  const handleFastAddTask = () => dispatch(openModal({
    type: modalTypes.fastAddTask,
  }));
  const handleViewTask = (taskId) => () => dispatch(openModal({
    type: modalTypes.fullTask,
    taskId,
  }));

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="inbox">
          <header className="view-header">
            <div className="view-header__content">
              <h1>{t('leftMenuTop.inbox')}</h1>
              <div className="view-header__actions">
                <a href="404">{t('inbox.comments')}</a>
              </div>
            </div>
          </header>
          <main className="listbox">
            <div className="view-content">
              <ul className="listbox-list">
                {tasks.map(({
                  addedBbyUid,
                  assignedByUid,
                  content,
                  dateAdded,
                  dateCompleted,
                  dayOrder,
                  description,
                  id,
                  labels,
                  priority,
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
                    />
                  </li>
                ))}
              </ul>
              {isOpen && type === modalTypes.fastAddTask
                ? null
                : (
                  <button onClick={handleFastAddTask} type="button" className="add-task">{t('buttons.fastAddTask')}</button>
                )}

              <ModalWindow />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Inbox;
