import React from "react";
import Timer from "../components/timer";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


const HomePage = () => {
  return <div>
    
    <h1>This is home page</h1>
    <Popup trigger={
          <button>Click for Timer</button>
        }
        position="right center">
          <div>
            <Timer/>
          </div>
          
        </Popup>
    </div>;
};

export default HomePage;