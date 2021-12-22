import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getModalInfo } from '../../store/modalSlice.js';
import FastAddTask from './FastAddTask.jsx';
import FullTask from './FullTask.jsx';
import FullAddTask from './FullAddTask.jsx';
import useScrollBlock from '../../hooks/useScrollBlock.jsx';

const modals = {
  FastAddTask,
  FullTask,
  FullAddTask,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector(getModalInfo);
  const [blockScroll, allowScroll] = useScrollBlock();
  const { type, isOpen } = modalInfo;
  const close = () => dispatch(closeModal());

  const scroll = isOpen ? blockScroll : allowScroll;

  scroll();

  if (!type) {
    return null;
  }

  const ModalComponent = modals[type];

  return (
    <div
      className={`modal-wrapper ${isOpen ? 'show' : 'fade'}`}
      aria-hidden="true"
    >
      <ModalComponent close={close} />

    </div>

  );
};

export default ModalWindow;
