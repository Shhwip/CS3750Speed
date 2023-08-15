import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
 <tr className={props.username === props.record.name ? "table-success" : null}>
   <td>{props.count}</td>
   <td>{props.record.name}</td>
   <td>{props.record.gamesplayed}</td>
   <td>{props.record.gameswon}</td>
   <td>{props.record.highscore}</td>
 </tr>
);
 
export default function Highscore({userName}) {
 const [records, setRecords] = useState([]);
 const [single, setSingle] = useState([]);
 let count = 0;
 const [istop10, setIstop10] = useState(false);
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
      count++;
      return (
        <Record
          record={record}
          key={record.name}
          username={userName}
          count={count}
        />
      );
    });
  }

  // fetch a single record
  useEffect(()=>{
    async function singleRecord() {
      const response = await fetch(`http://localhost:5050/record/${userName}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const record = await response.json();
      setSingle(record);
    }

    singleRecord();

    return;
  }, [single.length]);

  useEffect(()=>{
    records.forEach((element)=>{
      if (element.name === userName){
        setIstop10(true);
      }
    })
  })

  return (
    <div>
      <h3>Top 10 Scores</h3>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Games Played</th>
            <th>Games Won</th>
            <th>Win Percentage</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
      {!istop10 ?
      <>
      <h3>Your Score:</h3>
      <div>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Games Played</th>
            <th>Games Won</th>
            <th>Win Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-success">
            <td></td>
            <td>{single.name}</td>
            <td>{single.gamesplayed}</td>
            <td>{single.gameswon}</td>
            <td>{single.highscore}</td>
          </tr>
        </tbody>
      </table>
      </div>
      </>
      : null }
    </div>
  );
 }