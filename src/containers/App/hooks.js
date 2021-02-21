import { useEffect } from 'react';
import api from '../../api';

export const useGetPoints = () => {
  const DOCUMENT = process.env.REACT_APP_CARTO_TABLE_NAME;
  useEffect(() => {
    const query = `SELECT latitude, longitude, color FROM ${DOCUMENT}`;
    api(query).then(console.log);
  }, []);
};

export default useGetPoints;

