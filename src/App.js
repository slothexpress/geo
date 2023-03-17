import React, { useState, useEffect } from 'react';
import Card from './Card';

const apiUrl = 'http://isaac-doro.herokuapp.com';
let fetchedData = [];

function fetchApi(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      fetchedData = data;
      console.log("fetchApi", fetchedData);
    })
    .catch(error => {
      console.log(error);
    });
}

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchApi(apiUrl);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div>
        <h1>Latitude {latitude} </h1>
     
        <h1>Longitude {longitude} </h1>

        <Card />

    </div>
  );
}


export default App;
