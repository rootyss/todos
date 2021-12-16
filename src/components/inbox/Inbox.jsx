import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Task from '../task/Task.jsx';
import { openModal } from '../../store/modalSlice.js';
import { modalTypes } from '../../utils/constants.js';
import ModalWindow from '../modals/index.jsx';

const Inbox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFastAddTask = () => dispatch(openModal({
    type: modalTypes.fastAddTask,
  }));

  const addedBbyUid = 123;
  const assgnedByUid = 123;
  const content = 'Header';
  const dateAdded = '2021-12-15';
  const dateCompleted = null;
  const dayOrder = 1;
  const description = 'description';
  const id = 1;
  const labels = ['eat', 'kek'];
  const prioroty = 4;

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
                <Task
                  addedBbyUid={addedBbyUid}
                  assgnedByUid={assgnedByUid}
                  content={content}
                  dateAdded={dateAdded}
                  dateCompleted={dateCompleted}
                  dayOrder={dayOrder}
                  description={description}
                  id={id}
                  labels={labels}
                  prioroty={prioroty}
                />
                <Task
                  addedBbyUid={addedBbyUid}
                  assgnedByUid={assgnedByUid}
                  content={content}
                  dateAdded={dateAdded}
                  dateCompleted={dateCompleted}
                  dayOrder={dayOrder}
                  description={description}
                  id={id}
                  labels={labels}
                  prioroty={prioroty}
                />
              </ul>
              <button onClick={handleFastAddTask} type="button" className="add-task">{t('buttons.fastAddTask')}</button>
              <ModalWindow />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Inbox;
