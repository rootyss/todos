import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Label = ({ label }) => {
  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <span className="control-tag">
      {!isOpen
        ? (
          <Link className="label-link" to={`/labels/${label}`}>
            {label}
          </Link>
        )
        : (
          <span className="label">
            {label}
          </span>
        )}

    </span>
  );
};

export default Label;
