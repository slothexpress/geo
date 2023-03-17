import React, { useState, useEffect } from 'react';

let apiUrl = 'http://isaac-doro.herokuapp.com/59/14';

function fetchApi(url, setIncidents) {
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
          apiUrl = apiUrl + "/" + latitude + "/" + longitude;
          fetchApi(apiUrl, setIncidents);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation was not approved by user or is not supported in this browser.");
    }
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
