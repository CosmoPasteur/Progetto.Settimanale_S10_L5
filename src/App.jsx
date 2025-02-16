import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import HomePage from "./components/HomePage";
import { useState } from "react";
import EndBar from "./components/EndBar";

function App() {
  const getData = (city) => {
    setCity(city);
  };

  let [city, setCity] = useState("");

  return (
    <>
      <BrowserRouter>
        <TopBar childToParent={getData} />
        <Routes>
          <Route path="homepage" element={<HomePage searchName={city} />} />
        </Routes>
        <EndBar />
      </BrowserRouter>
    </>
  );
}

export default App;
