import React from 'react';

import Map from '../Map';
import Button from '../../components/Button';

import useGetPoints from './hooks';
import './styles.css';

const App = () => {
  const getPoints = useGetPoints();

  return (
    <div id="app">
      <Map
        zoom={5}
        lat={19.453603}
        lng={-99.140410}/>
      <Button/>
    </div>
  );
}

export default App;

