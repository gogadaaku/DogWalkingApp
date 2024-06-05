import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import $ from "jquery";
import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
import MapComponent from "../../../components/MapComponent";
import * as Yup from "yup";
import {
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/CheckoutForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
function Booking() {
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51OWZ9GCUGGApwmPQVQveZgsRZ3nvP58PyqAG9Ao7nHM2ROEolG8ywUWdPcipmwRbPNR8p5u0kDSWKc6iuE9jsgZ300rcGZi9dc"
  );
  const [country, setCountry] = useState("");
  const [dateAndTimeOfbooking, setDateAndTimeOfbooking] = useState(null);
  const [dateAndTimeforbooking, setDateAndTimeforbooking] = useState(null);
  const [price, setPrice] = useState(null);
  // State variables to manage geolocation state
  const [loading, setLoading] = useState(false); // Loading state for geolocation request
  const [error, setError] = useState(null); // Error state for geolocation request
  const [latitude, setLatitude] = useState(null); // Latitude value obtained from geolocation
  const [longitude, setLongitude] = useState(null); // Longitude value obtained from geolocation
  const [showMap, setShowMap] = useState(false); // State to show MapComponent
  // const [dataChild, setDataChild] = useState(null);
  const bookingSchema = Yup.object().shape({
    dateAndTimeOfBooking: Yup.string().required("Date is required"),
    petName: Yup.string().required("Pls Select Pet"),
    walkerName: Yup.string().required("Pls Select Walker"),
    fromTime: Yup.string().required("From time is required"),
    toTime: Yup.string().required("To time is required"),
    latitude: Yup.number().required("Location is required"),
    longitude: Yup.number().required("Location is required"),
    walkTime: Yup.number().required("Walk time is required"),
    paymetDuringBooking: Yup.bool().required(
      "Pls Select whether to Pay Now or Later"
    ),
  });
  const [showStripe, setShowStripe] = useState(false);
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const [validationErrors, setValidationErrors] = useState({});
  // Function to handle the geolocation request
  const handleGetLocation = () => {
    setLoading(true); // Set loading state to true before geolocation request
    setError(null); // Clear any previous errors

    // Use navigator.geolocation.getCurrentPosition to fetch current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Callback for successful geolocation request
        setLatitude(position.coords.latitude); // Set latitude from position object
        setLongitude(position.coords.longitude); // Set longitude from position object
        setLoading(false); // Reset loading state after successful request
        setShowMap(true); // Show MapComponent after successful location fetch
      },
      (error) => {
        // Callback for error in geolocation request
        setError("Error fetching location: " + error.message); // Set error message
        setLoading(false); // Reset loading state after error
      }
    );
  };
  function handleData(Data) {
    setBooking({
      ...booking,
      longitude: Data.longitude,
      latitude: Data.latitude,
    });
    console.log(Data);
  }
  const [walkTime, setWalkTime] = useState(null);
  const [book, setBook] = useState({});
  //for storing the form data
  const [booking, setBooking] = useState({
    dateForBooking: "",
    dateAndTimeOfBooking: "",
    petName: "",
    walkerName: "",
    fromTime: "",
    toTime: "",
    clientId: sessionStorage.getItem("id"),
    walkerId: "",
    petId: "",
    latitude: null,
    longitude: null,
    walkTime: null,
    paymetDuringBooking: null,
    transactionId: null,
    fare: null, // Added fare field to booking state
  });
  //To store All Walkers
  const [walker, setWalker] = useState([]);
  //TO store dogs of a client
  const [dogs, setDogs] = useState([]);
  //To store fetched breeds
  const [breeds, setBreeds] = useState([]);

  const [fromTime, setFromTime] = useState(null);
  //Use to store the finish time of the walk
  const [toTime, setToTime] = useState(null);
  //Used for displaying the total time for walk by client
  const [totalTime, setTotalTime] = useState(null);
  // const [value3, setValue3] = useState("");
  useEffect(() => {
    getAllClientDogs();
    getAllBreeds();
    getAllWalkers();
    // setDateAndTimeOfBooking();
  }, []);
  // const setDateAndTimeOfBooking = () => {
  //   let date = new Date().toISOString();
  //   date = date.substring(0, 9);
  //   let dateArray = date.split("-");
  //   date = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  //   console.log(date);
  //   setBooking({ ...booking, dateAndTimeOfBooking: date });
  // };
  //function getAll Walkers
  function getAllWalkers() {
    axios
      .get("https://localhost:7072/api/Users/GetEmployeeUsers")
      .then((d) => {
        console.log(d);
        setWalker(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //function to fetch breeds
  function getAllBreeds() {
    axios
      .get("https://localhost:7072/api/Breed")
      .then((d) => {
        // console.log(d.data);
        setBreeds(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //Funtion that actually gets data
  function getAllClientDogs() {
    axios
      .get("https://localhost:7072/api/Pet/" + sessionStorage.getItem("id"))
      .then((d) => {
        console.log(d.data);
        setDogs(d.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //for input tag date field
  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const changeTime1 = (e) => {
    // console.log(currentTime);
    let toTime = e.target.value;
    let toTimeArray = toTime.split(":");
    let toTimeHours = toTimeArray[0];
    let toTimeMinutes = toTimeArray[1];

    // console.log("Hours", toTimeHours);
    // console.log("minutes", toTimeMinutes);
    let timeAddition = parseInt(toTimeMinutes) + parseInt(booking.walkTime);
    if (timeAddition >= 60) {
      timeAddition = timeAddition - 60;
      toTimeHours = parseInt(toTimeHours) + 1;

      if (timeAddition < 10) {
        timeAddition = "0" + timeAddition;
      }
    }
    // console.log(timeAddition);
    // console.log("to time", toTimeHours + ":" + timeAddition);
    if (toTimeHours < 10) toTimeHours = "0" + toTimeHours;
    let timeFinal = toTimeHours + ":" + timeAddition;
    if (timeFinal == "12:60") {
      timeFinal = "13:00";
    }
    // console.log("dateAndTimeforbooking",dateAndTimeforbooking);
    let date22 = new Date(dateAndTimeforbooking).toISOString();
    date22 = date22.substring(0, 10);
    let date23 = new Date(`${date22} ${e.target.value}`).toString();
    console.log("date23 ", date23);
    // console.log(e.target.value)
    setBooking({
      ...booking,
      toTime: timeFinal,
      fromTime: e.target.value,
      dateForBooking: date23,
    });
  };
  //handle the change made on timepicker
  const changeTime2 = (e) => {
    setToTime("totime", e.target.value);
    calculateTotalTime(fromTime, e.target.value);
  };

  function calculateTotalTime(fromTime, toTime) {
    if (typeof fromTime === "string" && typeof toTime === "string") {
      const fromTimeArray = fromTime.split(":");
      const toTimeArray = toTime.split(":");

      const fromHours = parseInt(fromTimeArray[0]);
      const fromMinutes = parseInt(fromTimeArray[1]);
      const toHours = parseInt(toTimeArray[0]);
      const toMinutes = parseInt(toTimeArray[1]);

      const fromTotalMinutes = fromHours * 60 + fromMinutes;
      const toTotalMinutes = toHours * 60 + toMinutes;

      const totalMinutes = toTotalMinutes - fromTotalMinutes;

      setTotalTime(totalMinutes);
      setBooking({ ...booking, toTime: toTime, fromTime: fromTime });

      // console.log("fromTime:", fromTime);
      // console.log("toTime:", toTime);
      // console.log("Total time in minutes:", totalMinutes);
    }
  }

  //Assigning date to booking form
  const handleDateChange = (e) => {
    // console.log(e);

    let date = new Date();
    date = date.toString();
    let cdateAndTimeOfBooking = new Date().toString();
    // console.log("dateAndTimeOfBooking", dateAndTimeOfBooking);
    const dateArray = date.toString().split(" ");
    let date1 = new Date(`${e.target.value} ${dateArray[4]}`);
    date1 = date1.toString();

    setDateAndTimeOfbooking(cdateAndTimeOfBooking);
    setDateAndTimeforbooking(date1);
    setBooking({ ...booking, dateAndTimeOfBooking: cdateAndTimeOfBooking });
  };

  const handleLocation = (data) => {
    setBooking({
      ...booking,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };
  const handleSubmit = () => {

    // Logging the booking object
    console.log(booking);
    // Validating the booking object against the schema
    bookingSchema
      .validate(booking, { abortEarly: false })
      .then(() => {
        // Making a POST request to the server with the booking object
        axios
          .post("https://localhost:7072/api/Booking", booking)
          .then((d) => {
            // Logging success message
            console.log("successful");
            // Displaying success alert and navigating to the client home page
            Swal.fire({
              title: "Booking Done Successfully",
              icon: "success",
            }).then((d) => {
              navigate(ROUTES.clientHome.name);
            });
          })
          .catch((err) => {
            // Logging error if the POST request fails
            console.log(err);
          });
      })
      .catch((err) => {
        // Handling validation errors
        const errors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setValidationErrors(errors);
        console.log(errors)
      });
  };
  function handleClick(e) {
    setPrice(e.target.value);
    const checkboxes = document.getElementsByName("walkTime");
    const selectedValue = parseInt(e.target.value);
    let fare;

    // Set fare based on selected walk time
    switch (selectedValue) {
        case 15:
            fare = 250;
            break;
        case 30:
            fare = 400;
            break;
        case 45:
            fare = 450;
            break;
        default:
            fare = 0; // Default fare if no valid time is selected
    }

    // Unselect all other checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkboxes[i].value == e.target.value;
    }

    setBooking({ ...booking, walkTime: selectedValue, fare: fare });
  }
  const handleCountry = (data) => {
    console.log("data", data);
    setCountry(data);
  };
  return (
    <div>
      <Header1 />
      <h2 className="text-center">Booking</h2>
      <div className="d-flex justify-content-center">
        {dogs?.map((d) => (
          <div class="card mr-3" style={{ width: "18rem", height: "538.37" }}>
            <img style={{height:"auto",width:"inherit"}}
              class="card-img-top"
              src={`data:image/png;base64,${d.image}`}
              alt="Card imag"
            />
            <div class="card-body">
              <h5 class="card-title center">{d.name}</h5>
              {/* <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> */}
              <button
          onClick={() => {
            setBook(d);
            setBooking({...booking, petId: d.id, petName: d.name });
            console.log(book.breed);
            $("#drop").val(book.breed);
          }}
          class="btn btn-primary"
        >
          Book Walk
        </button>
            </div>
          </div>
        ))}
      </div>
      {validationErrors.petName && (
        <div className="text-danger center" style={{ marginTop: "5px" }}>
          {validationErrors.petName}
        </div>
      )}
      <div className="d-flex justify-content-center">
        {walker?.map((d) => (
          <div class="card" style={{ width: "18rem" }}>
            <img
              class="card-img-top"
              src={`data:image/png;base64,${d.userImage}`}
              alt="Card imag"
             style={{width:"inherit"}}
            />
            <div class="card-body">
              <h5 class="card-title center">{d.firstName}</h5>
              <p class="card-text">{d.rating}</p>
             <button
  onClick={() => {
    setBooking({
     ...booking,
      walkerId: d.id,
      walkerName: d.firstName + d.lastName,
    });
  }}
  className="btn btn-primary"
>
  Book Walker
</button>
            </div>
          </div>
        ))}
      </div>
      {validationErrors.walkerName && (
        <div className="text-danger center">{validationErrors.walkerName}</div>
      )}
      <div style={{ marginTop: 100 }} className="d-flex justify-content-center">
        <div className="border col-5">
          <div className="">
            <div className="form-group row mt-5">
              <label className="col-4">Name:</label>
              <div className="col-7">
                <input
                  disabled
                  value={book.name}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">Age:</label>
              <div className="col-7">
                <input
                  disabled
                  value={book.age}
                  className="form-control"
                  type="number"
                />
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">Weight:</label>
              <div className="col-7">
                <input
                  disabled
                  value={book.weight}
                  className="form-control"
                  type="number"
                />
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">Breed:</label>
              <div className="col-7">
                {/* <select
                  disabled
                  id="drop"
                  value={book.breed}
                  style={{ height: 45 }}
                  className="form-control"
                >
                  <option value=" " selected>
                    Select Breed
                  </option>
                  {breeds.map((breeds) => (
                    <option value={breeds.breedName}>{breeds.breedName}</option>
                  ))}
                </select> */}
                <input
                  disabled
                  className="form-control"
                  style={{ height: 45 }}
                  value={book.breed}
                />
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">Date for booking:</label>
              <div className="col-7">
                <input
                  pattern="\d{2}\/\d{2}\/\d{4}"
                  min={minDate.toISOString().split("T")[0]}
                  className="form-control"
                  type="date"
                  onChange={handleDateChange}
                />
                {validationErrors.dateAndTimeOfBooking && (
                  <div className="text-danger center">
                    {validationErrors.dateAndTimeOfBooking}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">Time for walk:</label>
              <div className="col-7">
                <div>
                  <label>15 Min Walk</label>&nbsp;
                  <input
                    name="walkTime"
                    onClick={handleClick}
                    type="checkbox"
                    value={15}
                  />
                </div>
                <div>
                  <label>30 Min Walk</label>&nbsp;
                  <input
                    name="walkTime"
                    onClick={handleClick}
                    type="checkbox"
                    value={30}
                  />
                </div>
                <div>
                  <label>45 Min Walk</label>&nbsp;
                  <input
                    name="walkTime"
                    onClick={handleClick}
                    type="checkbox"
                    value={45}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">From Time:</label>
              <div className="col-7">
                <input type="time" min={currentTime} onChange={changeTime1} />
                {validationErrors.fromTime && (
                  <div className="text-danger center">{validationErrors.fromTime}</div>
                )}
              </div>
            </div>
            <div className="form-group row mt-5">
              <label className="col-4">To Time:</label>
              <div className="col-7">
                <input disabled value={booking.toTime} type="time" />
                {validationErrors.toTime && (
                  <div className="text-danger center">{validationErrors.toTime}</div>
                )}
              </div>
            </div>

            <div className="form-group row mt-5">
              <label className="col-4">Pick Up Location:</label>
              <div className="col-7">
                <button style={{borderRadius:13,padding:"10px",border:"1px solid",height:"auto"}} onClick={handleGetLocation} disabled={loading}>
                  Get Location
                </button>
                {/* Display loading message while geolocation request is in progress */}
                {loading && <p>Loading...</p>}
                {/* Display error message if there's an error in geolocation request */}
                {error && <p>{error}</p>}
                {/* Display MapComponent if location is loaded successfully */}
                {/* Display latitude and longitude if available */}
                {latitude && longitude && (
                  <p>
                    Latitude: {latitude}, Longitude: {longitude}
                  </p>
                )}
                <div>
                  {showMap && (
                    <div>
                      <MapComponent
                        apiKey={
                          "AjOAOBd3_zkfcfVOz6VdCY3TxQP3LHhRN54A5zMOwkJEfsN8MAiegtZsNWjc762M"
                        }
                        longitude={longitude}
                        latitude={latitude}
                        sendDataToParent={handleData}
                        sendCountry={handleCountry}
                      />
                    </div>
                  )}
                </div>
                {validationErrors.latitude && (
                  <div className="text-danger center">{validationErrors.latitude}</div>
                )}
              </div>
              <div>
                <div>
                  <div className="form-group row mt-5">
                    <label className="col-4">Pay Now or Later:</label>
                    <div className="col-7">
                      <div className="row">
                        <div>
                          <label>Pay Later</label>
                          <input
                            onClick={() => {
                              setBooking({
                                ...booking,
                                paymetDuringBooking: false,
                              });
                              setShowStripe(false);
                            }}
                            name="pay"
                            type="radio"
                            style={{ width: 113 }}
                            value={false}
                          />
                        </div>
                        <div>
                          <label>Pay Now</label>
                          <input
                            onClick={() => {
                              setShowStripe(true);
                              setBooking({
                                ...booking,
                                paymetDuringBooking: true,
                              });
                            }}
                            name="pay"
                            type="radio"
                            style={{ width: 113 }}
                            value={true}
                          />
                        </div>
                      </div>
                    </div>
                    {validationErrors.paymetDuringBooking && (
                      <div className="text-danger center">
                        {validationErrors.paymetDuringBooking}
                      </div>
                    )}
                  </div>
                  {showStripe && (
                    <div className="form-group row mt-5">
                      <label className="col-4">Payment:</label>
                      <div className="col-7">
                        <Elements stripe={stripePromise}>
                          {booking != null ? (
                            <CheckoutForm
                              country={country}
                              price={price}
                              data={booking}
                            />
                          ) : (
                            <CheckoutForm />
                          )}
                        </Elements>
                      </div>
                    </div>
                  )}
                  {!showStripe && (
                    <button onClick={handleSubmit} className="form-control">
                      Book Walk
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
