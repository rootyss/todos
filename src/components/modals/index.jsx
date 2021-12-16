import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getModalInfo } from '../../store/modalSlice.js';
import FastAddTask from './FastAddTask.jsx';

const modals = {
  FastAddTask,
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
    <div className={isOpen ? 'show' : 'fade'}>
      <ModalComponent close={close} />
    </div>

  );
};

export default ModalWindow;
