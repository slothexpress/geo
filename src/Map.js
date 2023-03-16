import React from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'google-map-react';

function Map({ latitude, longitude }) {
  return (
    <GoogleMap center={{ lat: latitude, lng: longitude }} zoom={14}>
      <Marker lat={latitude} lng={longitude} />
    </GoogleMap>
  );
}

export default Map;