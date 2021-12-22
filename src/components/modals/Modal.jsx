import React, { useEffect, useCallback, useRef } from 'react';

const ModalButtonClose = ({ children, close }) => {
  const handleClose = (event) => {
    event.stopPropagation();
    close();
  };
  return (<button aria-label="Close" type="button" className="btn btn-close" onClick={handleClose}>{children}</button>);
};

const H = ({ children }) => <h3 className="text-truncate">{children}</h3>;

const Header = ({ children }) => (
  <div className="modal-header border-bottom">
    {children}
  </div>
);
Header.H = H;
Header.ButtonClose = ModalButtonClose;

const Body = ({ children }) => (
  <div className="modal-body">
    <div className="modal-task-info">
      {children}
    </div>
  </div>
);

const Modal = ({ children, close }) => {
  let modalContent = useRef(null); // eslint-disable-line functional/no-let

  const handleEscClose = useCallback((event) => {
    if (event.keyCode === 27) {
      close();
    }
  }, []);

  const handleClickOutside = (e) => {
    if (!modalContent.contains(e.target)) close();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose, false);
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("keydown", handleEscClose, false);
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  return (
    <div className="modal">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        ref={(node) => { modalContent = node; }}
      >
        {children}
      </div>
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
