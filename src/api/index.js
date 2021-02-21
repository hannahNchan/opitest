import * as constants from './constants';

const user = process.env.REACT_APP_CARTO_USERNAME;
const key = process.env.REACT_APP_CARTO_API_KEY;

//DOCUMENTATION https://carto.com/developers/sql-api/reference/
export const api = async QUERY => {
  const response = await fetch(`https://${user}${constants.BASE_URL}api_key=${key}&q=${QUERY}`, {
    method: 'GET',
  });
  return response.json();
};

export default api;

