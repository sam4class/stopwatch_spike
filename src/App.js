import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"; 


function App() {
  const dispatch = useDispatch();

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [stoppedTime, setStoppedTime] = useState(null);

  useEffect(() => {
    let interval = null;

    if(timerOn) {
  interval = setInterval(() => {
    setTime(prevTime => prevTime + 10)
  }, 10)
}else{
  clearInterval(interval);
  setStoppedTime(time);
}

return () => clearInterval(interval)
  }, [timerOn, time])

const handleSubmit = (event) => {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  console.log('HERERERRE', minutes, seconds)
  setStoppedTime(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
  console.log('this is in the handleStop', minutes + ":" + (seconds < 10 ? '0' : '') + seconds)

  dispatch ({
    type: 'POST_TIME',
    payload: minutes + ":" + (seconds < 10 ? '0' : '') + seconds
  })
  console.log('HERE is stoppedtime', minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
}

  return (
    <div className="App">
      <div className="timer">
      <span className="digits">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span className="digits">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span className="mili-sec">{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {!timerOn && time === 0 && (
        <button className="btn" onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && (
        <button className="btn" onClick={() => setTimerOn(false)}>Stop</button>
        )}
        {!timerOn && time !== 0 && (
        <button className="btn" onClick={() => setTimerOn(true)}>Resume</button>
        )}
        {!timerOn && time > 0 && (
        <button className="btn" onClick={() => {setTime(0); setStoppedTime(null);}}>Reset</button>
        )}
      </div>
      <div>
       
        <button className="submitBtn" onClick={handleSubmit}>Submit Time</button>
        
      </div>
    </div>
  );
}

export default App;
