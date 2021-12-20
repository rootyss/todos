import { useContext } from 'react';

import apiContext from '../context/apiContext.js';

const useApi = () => useContext(apiContext);

export default useApi;
