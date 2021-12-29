import React from 'react';

const Comments = ({ children, id }) => {
  const handleViewComments = () => {
    console.log(id);
  };
  return (
    <button className="actions-item" type="button" onClick={handleViewComments}>{children}</button>
  );
};

const Actions = ({ children }) => (
  <div className="view-actions">
    {children}
  </div>
);

Actions.Comments = Comments;

export default Actions;
