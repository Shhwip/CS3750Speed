import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  console.log(props.username),
 <tr className={props.username === props.record.name ? "table-success" : null}>
   <td>{props.record.name}</td>
   <td>{props.record.gamesplayed}</td>
   <td>{props.record.gameswon}</td>
   <td>{props.record.highscore}</td>
 </tr>
);
 
export default function Highscore({userName}) {
 const [records, setRecords] = useState([]);
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5050/record/`);
     console.log(response);
    console.log("looking for records");
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);

 function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record.name}
          username={userName}
        />
      );
    });
  }
  return (
    <div>
      <h3>Record List</h3>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Games Played</th>
            <th>Games Won</th>
            <th>Win Percentage</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
 }