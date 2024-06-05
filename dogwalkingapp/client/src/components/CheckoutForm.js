import React from "react";
import { useState } from "react";
import "./CheckoutForm.css";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import data from "../country/CountryCodesCurrency.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ROUTES from "../navigations/Routes.js";
const CheckoutForm = (props) => {
  const navigate = useNavigate();
  // const {
  //   date,
  //   petName,
  //   walkerName,
  //   fromTime,
  //   toTime,
  //   clientId,
  //   walkerId,
  //   petId,
  //   latitude,
  //   longitude,
  //   walkTime,
  //   paymetDuringBooking,
  // } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  };
  // Static data
  const STATIC_AMOUNT = 1000; // Amount in cents
  const STATIC_CURRENCY = "usd";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);

    if (!stripe || !elements) {
      setPaymentLoading(false);
      return;
    }
    console.log(props);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    const { token } = await stripe.createToken(
      elements.getElement(CardElement)
    );
    console.log(token);
    console.log("props wali country", props.country);
    // const currency = data.country_codes.find((x) => x.country == props.country);
    const currency = data.country_codes.find((x) => x.country == props.country);
    {
      currency && console.log("currency", currency);
    }
    try {
      const { token } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      const response = await axios
        .post("https://localhost:7072/api/Stripe", {
          token: token.id,
          amount: 100000,
          currency: "usd",
        })
        .then((d) => {
          console.log("transaction id:",d.data);
          const data = props.data;
          data.transactionId=d.data;
          console.log(data);
          axios.post("https://localhost:7072/api/Booking", data).then((d) => {
            console.log(d.data);
            Swal.fire({
              title: "Payment Successful And Booking done",
              confirmButtonText: "Go To Home",
              icon: "success",
            }).then((d) => {
              console.log(d);
              navigate(ROUTES.clientHome.name);
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      if (response) {
        // Payment successful
        // Handle the response from the backend
      } else {
        // Payment failed
        // Handle the error
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error processing payment:", error);
    }

    setPaymentLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ width: 260 }}>
          Card details
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
      </div>
      <button
        style={{ width: 500, marginLeft: -200 }}
        disabled={isPaymentLoading}
      >
        {isPaymentLoading ? "Loading..." : "Pay and Book"}
      </button>
    </form>
  );
};

export default CheckoutForm;
