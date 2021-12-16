import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getModalInfo } from '../../store/modalSlice.js';
import ModalAddTask from './AddTask.jsx';

const modals = {
  addTask: ModalAddTask,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector(getModalInfo);

  const { type, isOpen } = modalInfo;
  const close = () => dispatch(closeModal());

  if (!type) {
    return null;
  }

  const ModalComponent = modals[type];

  return (
    <div role="dialog" aria-modal="true" className="fade modal" tabIndex="-1" style="display: block;">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalComponent close={close} />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
