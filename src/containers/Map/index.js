import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import useMap from './hooks';

import './styles.css';

const Map = (props)  => {
  const getMaps = useMap(props);

  return (
    <div id="map" />
  );
}

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  basemapURL: PropTypes.string,
};

export default Map;

