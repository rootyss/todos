import React from 'react';
import { useParams } from "react-router-dom";

const LabelSearch = () => {
  const params = useParams();
  return (<div>{params.labelId}</div>);
};

export default LabelSearch;
