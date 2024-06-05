import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./navigations/Navigation";
import { useEffect } from "react";

function App() {
  return (
    <div>
      <Navigation />
    </div>
  );
}

export default App;
