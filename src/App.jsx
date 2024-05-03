import { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [dateValidate, setDateValidate] = useState(false);
  const [sec, setSec] = useState(0);
  const [currMin, setCurrMin] = useState(new Date().getMinutes());
  const [currHour, setCurrHour] = useState(new Date().getHours());
  
  const timeDifference = date.getTime() - Date.now();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  const validation = () => {
    setDateValidate(daysDifference > 99);
  };

  const timer = () => {
    const intervalId = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec === 0) {
          if (currMin === 0 && currHour === 0 && daysDifference === 0) {
            clearInterval(intervalId);
          } else if (currMin === 0 && currHour === 0 && daysDifference > 0) {
            setCurrHour(23);
            setCurrMin(59);
            return 59;
          } else if (currMin === 0 && currHour > 0) {
            setCurrHour((prevHour) => prevHour - 1);
            return 59;
          } else if (currMin > 0) {
            setCurrMin((prevMin) => prevMin - 1);
            return 59;
          }
        } else {
          return prevSec - 1;
        }
      });
    }, 1000);
  };

  const handleClick = () => {
    validation();
    timer();
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        id="meeting-time"
        onChange={(e) => setDate(new Date(e.target.value))}
      />

      <button onClick={handleClick}>Start Timer</button>

      {dateValidate ? (
        <p>Selected time is more than 100 days</p>
      ) : (
        <div className="display">
          <div className="daydisplay">
            <p>{daysDifference}</p>
            <p>Days</p>
          </div>
          <div className="hourdisplay">
            <p>{currHour}</p>
            <p>Hours</p>
          </div>
          <div className="mindisplay">
            <p>{currMin}</p>
            <p>Minutes</p>
          </div>
          <div className="secdisplay">
            <p>{sec}</p>
            <p>Seconds</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;