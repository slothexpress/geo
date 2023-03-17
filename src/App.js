import React, { useState, useEffect } from 'react';

const rootUrl = 'http://isaac-doro.herokuapp.com/';
let apiUrl = rootUrl;

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          if(latitude && longitude) {
            apiUrl = rootUrl + "/" + latitude + "/" + longitude;
          }
        },
        (error) => {
          apiUrl = rootUrl;
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation was not approved by user or is not supported in this browser.");
    }
    fetchApi(apiUrl, setIncidents);
  }, []);

  if (incidents.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div>
        
          {incidents.map((incident) => (
          <div key={incident.id}>
            <h2>Prio {incident.priority}:</h2>
            <h2>{incident.title}</h2>
            <h3>{incident.exactlocation}</h3>
            <h3>{incident.description}</h3>
            
            <p>- - - - - - - - - - - -</p>
          </div>
          ))}
        

        </div>

        
      </div>
    );
  }
}

export default App;
