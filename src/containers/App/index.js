import React, { useState } from 'react';

import api from '../../api';
import Map from '../Map';
import Button from '../../components/Button';

import './styles.css';

const App = () => {
  const [markers, setMarkers] = useState([]);
  
  const onHandleClick = async () => {
    const query = 'SELECT latitude, longitude, color FROM puntos_examen_frontend';
    const { rows } = await api(query);
    setMarkers(rows);
  };

  return (
    <div id="app">
      <Map
        markers={markers}
        zoom={5}
        lat={19.453603}
        lng={-99.140410}
      >
      </Map>
      <Button onClick={() => onHandleClick()}>OBTENER PUNTOS</ Button>
    </div>
  );
}

export default App;

