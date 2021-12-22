import React from 'react';
import { getFormatedDate } from '../../utils/utils.js';
import Label from '../label/Label.jsx';

const Task = ({
  content,
  dateAdded,
  dateCompleted,
  description,
  labels = [],
  priority,
  handleViewTask,
}) => (
  <div className="task-list-item__body">
    <div className="task-list-item__child" />
    <button type="button" role="checkbox" className="task-checkbox" aria-checked="false">
      <div className="task_checkbox__circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z" />
        </svg>
      </div>
    </button>
    <div className="task-list-item__content" role="button" onClick={handleViewTask} tabIndex="0">
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
        {labels.map((label) => <Label key={label} label={label} />)}
      </div>
    </div>
  </div>
);

export default Task;
