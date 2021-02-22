import { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import * as L from 'leaflet';

// https://stackoverflow.com/questions/61705998/react-leaflet-hooks-setview-and-useref
export const useMap = ({ lat, lng, zoom, markers }) => {
  const basemapURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png';

  const mapMexRef = useRef(L.featureGroup());

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

  function clearMap() {
    const map = mapMexRef.current;
    map.stopLocate();
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
  }

  useEffect(() => {
    if (markers.length === 0) {
      //clearMap();
    } else {
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
    }
  },[markers]);
  
  useMap.propTypes = {
    lat: PropTypes.number, 
    lng: PropTypes.number, 
    zoom: PropTypes.number, 
    markers: PropTypes.array,
  };
} 

export default useMap;

