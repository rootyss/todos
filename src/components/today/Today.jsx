import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Task from '../task/Task.jsx';
import { getTasks, getFetchingStateTasks } from '../../store/tasksSlice.js';
import { getUser } from '../../store/userSlice.js';
import { isExpired } from '../../utils/utils.js';

const Today = () => {
  const { t } = useTranslation();
  const tasks = useSelector(getTasks);
  const user = useSelector(getUser);
  const fetchingTasksState = useSelector(getFetchingStateTasks);
  const isRenderTasks = fetchingTasksState === 'finished';

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header">
            <div className="view-header__content">
              <h1>{t('leftMenuTop.today')}</h1>
            </div>
          </header>
          <main className="listbox">
            <div className="view-content">
              {isRenderTasks ? (
                <>
                  <h3>{t('today.inbox')}</h3>
                  <ul className="listbox-list">
                    {// eslint-disable-next-line max-len
                      tasks.filter(({ dateCompleted, addedToUid }) => (new Date(dateCompleted).getTime() <= new Date().getTime())
                    && (addedToUid === user.uid)).map(({
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
                      })
}
                  </ul>
                  <h3>{t('today.outbox')}</h3>
                  <ul className="listbox-list">

                    { // eslint-disable-next-line max-len
                      tasks.filter(({ dateCompleted, addedByUid }) => (new Date(dateCompleted).getTime() <= new Date().getTime())
                    && (addedByUid === user.uid)).map(({
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
                      })
}
                  </ul>
                </>
              )
                : <div>Loading</div>}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Today;
