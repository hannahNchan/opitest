import React, { useState, useEffect } from 'react';

import api from '../../api';
import Map from '../Map';
import Button from '../../components/Button';
import FilterList from '../../components/FilterList';

import { constructQuery, getPercentages } from './utils';
import './styles.css';


const App = () => {
  const [markers, setMarkers] = useState([]);
  const [types, setTypes] = useState([]);
  const [whereQuery, setWhereQuery] = useState('');
  const [percentage, setPercentage] = useState([]); 
  const getQuery = `SELECT latitude, longitude, color, tipo FROM puntos_examen_frontend ${whereQuery}`;

  useEffect(() => {
    if (whereQuery !== '') {
      handleRequest();
    }
  }, [whereQuery]);

  const handleRequest = async () => {
    const { rows } = await api(getQuery);

    const all = rows.map(item => {
      return {
        [item.tipo]: item.color,
      }
    });
    const getTipo = rows.map(item => item.tipo);
    const tipos = new Set(getTipo);
    
    const typeArray = [];
    tipos.forEach(type => {
      const numbers = rows.filter(item => item.tipo === type).length;
      const colors = all.filter(item => item[type])[0][type];
      typeArray.push({ type, numbers, colors });
    });
    if (whereQuery === '') {
      const percent = getPercentages(typeArray);
      setPercentage(percent);
      setTypes(typeArray);
    }
    setMarkers(rows);
  };

  const onHandleClick = () => {
    handleRequest();
  };

  const handleGetData = type => {
    if (type.length === 0) {
      setMarkers([]);
    } else {
      const query = constructQuery(type); 
      setWhereQuery(query);
    }
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
      <FilterList types={types} percentage={percentage} onHandleChange={handleGetData}/>
      <Button disabled={types.length !== 0} onClick={() => onHandleClick()}>OBTENER PUNTOS</ Button>
    </div>
  );
}

export default App;

