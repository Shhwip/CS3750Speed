import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import clubs2 from './png/2_of_clubs.png';
import Image from 'react-bootstrap/Image';

function DisplayData({ record }) {
  return <h1>Group Name: {record.groupName}</h1>;
}

function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch('http://localhost:5050/');

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const records = await response.json();
        setRecords(records);
      } catch (error) {
        window.alert(error.message);
      }
    }

    fetchRecords();
  }, []);

  return (
    <div className="App">
      {records.map((record) => (
        <DisplayData key={record._id} record={record} />
      ))}
      <Image src={clubs2} fluid />
    </div>
  );
}

export default App;
