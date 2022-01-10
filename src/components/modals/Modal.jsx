import React, { useRef, useEffect } from 'react';

const ModalButtonClose = ({ children, close }) => {
  const focusElem = useRef(null);

  useEffect(() => {
    focusElem.current.focus();
  }, []);

  return (<button ref={focusElem} aria-label="Close" type="button" className="btn btn-close" onClick={close}>{children}</button>);
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

const Modal = ({ children, close }) => (
  <div className="modal" onClick={close} onKeyDown={(e) => { if (e.keyCode === 27) close(); }}>
    <div
      onClick={(e) => e.stopPropagation()}
      tabIndex={0}
      className="modal-content"
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  </div>
);

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
