import React from 'react';
import { Link } from "react-router-dom";

const Label = ({ label }) => <span className="control-tag"><Link className="label-link" to={`/labels/${label}`}>{label}</Link></span>;

export default Label;
