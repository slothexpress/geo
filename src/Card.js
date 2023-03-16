import React, { useState, useEffect } from 'react';

export default function Card() {
    const apiUrl = 'http://localhost:8080/15/59';
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was NOT OK from ' + apiUrl);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setNodes(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);  
          
    return (
        <div>
            TEST
        </div>
    );
}
