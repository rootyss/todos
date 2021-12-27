import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../store/tasksSlice.js';
import Task from '../task/Task.jsx';
import { openModal } from '../../store/modalSlice.js';
import { modalTypes } from '../../utils/constants.js';

const LabelSearch = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const currentLabel = params.labelId;
  const currentTasks = tasks.filter(({ labels }) => {
    const labelNames = labels.map(({ label }) => label);
    return labelNames.includes(currentLabel);
  });

  const handleViewTask = (taskId) => () => dispatch(openModal({
    type: modalTypes.fullTask,
    taskId,
  }));

  return (
    <div>
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

    </div>
  );
};

export default LabelSearch;
