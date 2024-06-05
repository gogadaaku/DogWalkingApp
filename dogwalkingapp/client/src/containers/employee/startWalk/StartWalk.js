import React, {  useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
// import Webcam from "react-webcam";
import WebcamCapture from "../../../components/webcam/WebcamCapture";
import Timer from "../../../components/timer/Timer";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ROUTES from "../../../navigations/Routes";
function StartWalk() {
  const [searchParams] = useSearchParams();
  const queryPetId = searchParams.get("petId");
  // console.log("queryPetId", queryPetId);
  const queryBookingId = searchParams.get("bookingId");
  const transactionId = searchParams.get("transactionId");
  const [transactionDone, setTransactionDone] = useState(false);
  useEffect(() => {
    walkDate();
    if (transactionId === "null") {
      setTransactionDone(false);
    } else if (transactionId !== "null") setTransactionDone(true);
    // if(transactionId!=null)setTransactionDone()
  }, [searchParams, transactionId, walkDate]);
  const [totalTime, setTotalTime] = useState(null);
  // const [completeTimeString, setCompleteTimeString] = useState(null);
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const queryparams = useQuery();
  const walkerId = queryparams.get("walkerId");
  const clientId = queryparams.get("clientId");
  useEffect(() => {
    let totalTime = queryparams.get("totalTime");
    setTotalTime(totalTime);
  }, [queryparams]);
  // const [petId, setPetId] = useState(null);
  // const [bookingId, setBookingId] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [startPetImage, setStartPetImage] = useState(null);
  const [endPetImage, setEndPetImage] = useState(null);
  const [showtimer, setShowTimer] = useState(false);
  const [startWalkbutton, setStartWalkButton] = useState(true);
  const [showTextFields, setShowTextFields] = useState(false);
  const navigate = useNavigate();
  const [walkData, setWalkData] = useState({
    petId: queryPetId || "",
    bookingId: queryBookingId || "",
    startTime: "",
    completeTime: "",
    startPetImage: "",
    endPetImage: "",
    dogBehaviour: "",
    dogWalkDescriptions: "",
    dateOfWalk: "",
    walkerId: walkerId || "",
    clientId: clientId || "",
  });

  function walkDate() {
    let date = new Date().toISOString();
    date = date.substring(0, 10);
    let dateArray = date.split("-");
    let date1 = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
    // console.log("date1:", date1, dateArray);
    setWalkData({ ...walkData, dateOfWalk: date1 });
  }
  const handleImageData = (data) => {
    // console.log("Image:", data);
    if (startPetImage == null) {
      setStartPetImage(data);
      setShowCamera(!showCamera);
      setShowTimer(!showtimer);
      setWalkData({ ...walkData, startPetImage: data });
    } else {
      setEndPetImage(data);
      setShowCamera(false);
      setWalkData({ ...walkData, endPetImage: data });
    }
  };
  const handleTrueFalse = (data) => {
    // console.log("data", data);
    setShowCamera(true);
    setShowTimer(false);
    setShowTextFields(true);
  };
  const handleStartTime = (data) => {
    // console.log("startTime", data);
  };
  const handleCompleteTime = (data) => {
    // console.log("completetime", data);
    setWalkData({ ...walkData, completeTime: data });
  };
  const handleMultipleSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedText = [];

    options.forEach((option, index) => {
      const text = option.text;
      selectedText.push(text);
    });

    // Join the selected text values with commas
    const selectedTextString = selectedText.join(", ");
    setWalkData({ ...walkData, dogBehaviour: selectedTextString });
    // Do something with the selectedTextString
    // console.log("Selected text:", selectedTextString);
  };
  const handleDogDescription = (e) => {
    setWalkData({ ...walkData, dogWalkDescriptions: e.target.value });
    // console.log(e);
  };
  const handleDogWalkSubmit = async (e) => {
    postData();
  };
  function postData() {
    try {
      axios
        .post("https://localhost:7072/api/EmployeeBooking", walkData)
        .then((d) => {
          // console.log(d.data);
          Swal.fire({
            title: "Walk Completed",
            icon: "success",
          }).then(() => {
            navigate(ROUTES.empHome.name);
          });
          navigate();
        })
        .catch((err) => {
          // console.log(err);
        });
    } catch (error) {}
  }
  const showData = () => {
    console.log("startPetImage", startPetImage);
    console.log("end Pet image", endPetImage);
    console.log("walk data", walkData);
    console.log("transactionId", transactionId);
    console.log("transactionDone", transactionDone);
  };
  return (
    <div>
      <Header1 />
      <h2 className="text-center">Walk</h2>
      <br></br>
      {startWalkbutton && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="button-89"
            onClick={() => {
              setStartWalkButton(false);
              setShowCamera(!showCamera);
              let date = new Date().toString();
              let dateArray = date.split(" ");
              // console.log(dateArray[4]);

              setWalkData({ ...walkData, startTime: dateArray[4] });
            }}
            start
            walk
          >
            Start Walk
          </button>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {showCamera && <WebcamCapture dataFromChild={handleImageData} />}
      </div>
      <div>
        {showtimer && (
          <Timer
            sendStartTime={handleStartTime}
            sendCompleteTime={handleCompleteTime}
            sendButton={handleTrueFalse}
            minMinutes={totalTime}
          />
        )}
      </div>
      <button
        onClick={() => {
          showData();
        }}
      >
        data dekho
      </button>
      {endPetImage && (
        <div className="container">
          <div className="form-group row">
            <div className="col-lg-4">
              <label>Dog Behaviour During Walk:</label>
            </div>
            <div className="col-lg-6 ">
              <select
                onChange={handleMultipleSelect}
                multiple
                className="form-control"
              >
                {" "}
                <option>Tilting head to one side</option>{" "}
                <option>Opening eyes and staring</option>{" "}
                <option>Bowing</option> <option>Shaking head</option>{" "}
                <option>Pricking ears</option>{" "}
                <option>Freezing and leaning</option> <option>Yawning</option>{" "}
                <option>Flicking ears</option> <option>Stretching</option>{" "}
                <option>Closing mouth or opening it slightly</option>{" "}
                <option>Walking in circles before lying down</option>{" "}
                <option>Licking lips</option> <option>Pacing</option>{" "}
                <option>Showing teeth and biting</option>{" "}
                <option>Licking genitals</option> <option>Panting</option>{" "}
                <option>Wagging tail</option>{" "}
                <option>Barking and yelping</option>{" "}
                <option>Holding tail straight</option> <option>Growling</option>{" "}
                <option>Tucking tail between legs</option>{" "}
                <option>Howling</option> <option>Whining and whimpering</option>{" "}
                <option>Mounting or humping</option>{" "}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-4">
              <label>Dog Description:</label>
            </div>
            <div className="col-lg-6 ">
              <textarea
                rows={5}
                className="form-control"
                onChange={handleDogDescription}
              />
            </div>
          </div>
          {transactionDone && (
            <h1 className="text-center">Client has paid the ammount </h1>
          )}
          {!transactionDone && (
            <h1 className="text-center">Client has not paid ammount</h1>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleDogWalkSubmit} className="button-89">
              Submit And Complete Walk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartWalk;
