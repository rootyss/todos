import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal.jsx';
import FormAddTask from '../formAddTask/FormAddTask.jsx';

const FullAddTask = ({ close }) => {
  const { t } = useTranslation();

  return (
    <Modal close={close}>
      <Modal.Header>
        <Modal.Header.H>{t('modals.addTaskHeader')}</Modal.Header.H>
        <Modal.Header.ButtonClose close={close} />
      </Modal.Header>
      <Modal.Body>
        <FormAddTask close={close} />
      </Modal.Body>
    </Modal>
  );
};

export default FullAddTask;
