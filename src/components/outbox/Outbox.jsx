import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../task/Task.jsx';
import { openModal, getModalInfo } from '../../store/modalSlice.js';
import { getTasks, getFetchingStateTasks } from '../../store/tasksSlice.js';
import { modalTypes } from '../../utils/constants.js';
import { getUser } from '../../store/userSlice.js';
import { isExpired } from '../../utils/utils.js';

const Outbox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const user = useSelector(getUser);
  const modalInfo = useSelector(getModalInfo);
  const { type, isOpen } = modalInfo;
  const fetchingTasksState = useSelector(getFetchingStateTasks);
  const isRenderTasks = fetchingTasksState === 'finished';

  const handleFastAddTask = () => dispatch(openModal({
    type: modalTypes.fastAddTask,
  }));

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header">
            <div className="view-header__content">
              <h1>{t('leftMenuTop.outbox')}</h1>
            </div>
          </header>
          <main className="listbox">
            <div className="view-content">
              {isRenderTasks ? (
                <ul className="listbox-list">
                  {tasks.filter(({ addedByUid }) => addedByUid === user.uid).map(({
                    addedBbyUid,
                    content,
                    dateAdded,
                    dateCompleted,
                    dayOrder,
                    description,
                    id,
                    labels,
                    priority,
                    isCompleted,
                  }) => {
                    if (isCompleted) return null;
                    return (
                      <li key={id} className="task-list-item">
                        <Task
                          addedBbyUid={addedBbyUid}
                          content={content}
                          dateAdded={dateAdded}
                          dateCompleted={dateCompleted}
                          dayOrder={dayOrder}
                          description={description}
                          id={id}
                          labels={labels}
                          priority={priority}
                          isCompleted={isCompleted}
                          isExpired={isExpired(dateCompleted)}
                        />
                      </li>
                    );
                  })}
                </ul>
              )
                : <div>Loading</div>}
              {isOpen && type === modalTypes.fastAddTask
                ? null
                : (
                  <button onClick={handleFastAddTask} type="button" className="add-task">{t('buttons.fastAddTask')}</button>
                )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Outbox;
