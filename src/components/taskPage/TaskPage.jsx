import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Task from '../task/Task.jsx';

const RenderTask = ({ task }) => {
  const {
    addedToUid,
    content,
    dateAdded,
    dateCompleted,
    dayOrder,
    description,
    id,
    labels,
    priority,
    isCompleted,
  } = task;

  return (
    <Task
      addedToUid={addedToUid}
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
  );
};

const TaskPage = () => {
  const { id } = useParams();
  const [viewTask, setTask] = useState(null);
  const curTask = useSelector((state) => state.tasksInfo.tasks.find((task) => task.id === id));
  const { t } = useTranslation();

  useEffect(() => setTask(curTask));

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header">
            <div className="view-header__content">
              <h1>{t('taskPage.header')}</h1>
            </div>
          </header>
          {viewTask ? (<RenderTask task={viewTask} />) : null}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
