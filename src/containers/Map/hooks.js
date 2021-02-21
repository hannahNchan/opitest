import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as L from 'leaflet';

// https://stackoverflow.com/questions/61705998/react-leaflet-hooks-setview-and-useref
export const useMap = ({ lat, lng, zoom, markers }) => {
  const basemapURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png';

  const mapMexRef = useRef();

  useEffect(() => {
    mapMexRef.current = L.map('map', {
      center: [lat, lng],
      zoom,
      zoomControl: false
    });
    const basemap = L.tileLayer(basemapURL, {
      detectRetina: true,
      retina: '@2x',
    });
    basemap.addTo(mapMexRef.current)

  }, [
    lat,
    lng,
    zoom,
    basemapURL,
  ]);

  useEffect(() => {
    markers.forEach(location => {
      L.circle([location.latitude, location.longitude], {
        color: `#${location.color}`,
        fillColor: `#${location.color}`,
        fillOpacity: 1,
        radius: 3,
      },{
        color: location.color,
      })
        .addTo(mapMexRef.current)
    })
  },[markers]);
  
  useMap.propTypes = {
    lat: PropTypes.number, 
    lng: PropTypes.number, 
    zoom: PropTypes.number, 
    markers: PropTypes.array,
  };
} 

export default useMap;

