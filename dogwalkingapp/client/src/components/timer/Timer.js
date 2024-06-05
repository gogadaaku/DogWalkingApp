import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { date } from "yup";
import "./Timer.css";
function Timer(props) {
  //   const [time, setTime] = useState(props.minMinutes * 60);
  const [time, setTime] = useState(10);
  const [startWalkTime, setStartWalkTime] = useState(null);
  const [completeWalkTime, setCompleteWalkTime] = useState(null);
  const [isRunnig, setIsRunning] = useState(false);
  const [showCompleteWalkButton, setShowCompleteWalkButton] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showStopButton, setShowStopButton] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isRunnig) {
      intervalId = setInterval(() => {
        setTime((previousState) => previousState - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunnig]);
  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      setShowCompleteWalkButton(true);
      setShowStartButton(false);
      setShowStopButton(false);
      // const formattedtime1 = new Intl.DateTimeFormat("en-IN", {
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   second: "2-digit",
      //   timeZone: "Asia/Kolkata",
      // }).format(new Date());
      // setCompleteWalkTime(formattedtime1);
    }
  }, [time]);
  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);
  function handleStartButton() {
    // const formattedTime = new Intl.DateTimeFormat("en-IN", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   timeZone: "Asia/Kolkata",
    // }).format(new Date());
    // console.log("datetime", formattedTime);
    let date = new Date().toString();
    let dateArray = date.split(" ");

    setCompleteWalkTime(dateArray[4]);
    setIsRunning(true);
  }
  function handleStopButton() {
    // let timeInMinutes = time;
    let totalTime = props.minMinutes * 60;
    let timeCo = time;
    console.log(time);
    if (time > 0) {
      Swal.fire({
        title: "Time Not Completed",
        icon: "error",
      });
    } else {
      const formattedtime1 = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      setCompleteWalkTime(formattedtime1);
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1 className="text-center">Timer</h1>
      <br></br>
      <h2 style={{ fontSize: 200 }}>{formattedTime}</h2>
      <div style={{ fontSize: 40 }}>
        {showStartButton && (
          <button className="button-30" onClick={handleStartButton}>
            Start
          </button>
        )}
        &nbsp;
        {showStopButton && (
          <button className="button-30" onClick={handleStopButton}>
            Stop
          </button>
        )}
      </div>
      <div>
        {showCompleteWalkButton && (
          <button
            className="button-89"
            onClick={() => {
              props.sendButton(true);
              props.sendStartTime(startWalkTime);
              props.sendCompleteTime(completeWalkTime);
            }}
          >
            Complete Walk
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;
