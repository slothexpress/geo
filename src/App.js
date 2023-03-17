import React, { useState, useEffect } from 'react';

const rootUrl = 'http://isaac-doro.herokuapp.com';


function fetchApi(url, setIncidents) {
  console.log("url: ", url)
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setIncidents(data);
      console.log("fetchApi", data);
    })
    .catch(error => {
      console.log(error);
    });
}

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      console.log("fetching...");
      if (latitude && longitude) {
        const lat = latitude.toString();
        const lon = longitude.toString();
        const apiUrl = `${rootUrl}/${lat}/${lon}`;
        fetchApi(apiUrl, setIncidents);

      } else {
        fetchApi(rootUrl, setIncidents);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation has not been shared by user OR is not supported by this browser.");
    }

    // Fetch data initially and then every 2 sec
    fetchData();
    const intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [latitude, longitude]);

  if (incidents.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (longitude && latitude) {
    return (
      <div>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        --------------------
        <div>
          {incidents.map((incident) => (
            <div key={incident.id}>
              <h2>Prio {incident.priority}:</h2>
              <h2>{incident.title}</h2>
              <h3>{incident.exactlocation}</h3>
              <h3>{incident.description}</h3>
              <h3>{incident.category}</h3>
              <p>- - - - - - - - - - - -</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Waiting for location...</p>
          {incidents.map((incident) => (
            <div key={incident.id}>
              <h2>Prio {incident.priority}:</h2>
              <h2>{incident.title}</h2>
              <h3>{incident.exactlocation}</h3>
              <h3>{incident.description}</h3>
              <h3>{incident.category}</h3>
              <p>- - - - - - - - - - - -</p>
            </div>
          ))}
        </div>
    )
  }
}

export default App;
