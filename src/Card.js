
import React from 'react';

export default function Card({ incident }) {
  return (
    <div>
      <h2>Prio {incident.priority}:</h2>
      <h2>{incident.title}</h2>
      <h3>{incident.exactlocation}</h3>
      <h3>{incident.description}</h3>
      <h3>{incident.description}</h3>
    </div>
  );
}

