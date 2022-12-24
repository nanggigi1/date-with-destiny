import React, { useEffect, useState, useRef } from "react";

function App() {
  const home = "1+Roanoke+St,+San+Francisco,+CA+94131,+USA";
  const [origin, setOrigin] = useState(home);
  const [isNewBounds, setIsNewBounds] = useState(false);
  const [bound_E, setBound_E] = useState(37.68600580884664);
  const [bound_W, setBound_W] = useState(37.8109966770205);
  const [bound_N, setBound_N] = useState(-122.51484621269604);
  const [bound_S, setBound_S] = useState(-122.36765578921198);
  const [inputNW, setInputNW] = useState("");
  const [inputSE, setInputSE] = useState("");
  const [boundsFormVisibility, setBoundsFormVisibility] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    console.log(bound_W + ", " + bound_N + ", " + bound_E + ", " + bound_S);
  }, [isNewBounds]);

  useEffect(() => {
    console.log("Getting current location…");
    if (!navigator.geolocation) {
      alert(
        `Your browser doesn't support Geolocation. Using ${home} as your start location.`
      );
      return;
    } else {
      navigator.geolocation.getCurrentPosition(handleLocationResult, () =>
        alert(
          `Unable to get your current location. Using ${home} as your start location.`
        )
      );
    }
  }, []);

  function handleLocationResult(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setOrigin(lat + "," + long);
    console.log(`Current location: ${lat}, ${long}`);
  }

  function getRandomFloat(min, max, decimals = 14) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }
  function updateInputNW(e) {
    setInputNW(e.target.value);
  }
  function updateInputSE(e) {
    setInputSE(e.target.value);
  }
  function isValidInput() {
    const w = parseFloat(inputNW.split(",")[0]);
    const n = parseFloat(inputNW.split(",")[1]);
    const e = parseFloat(inputSE.split(",")[0]);
    const s = parseFloat(inputSE.split(",")[1]);
    if (isNaN(w) || isNaN(n) || isNaN(e) || isNaN(s)) {
      return false;
    } else {
      return true;
    }
  }
  function updateBounds() {
    const w = parseFloat(inputNW.split(",")[0]);
    const n = parseFloat(inputNW.split(",")[1]);
    const e = parseFloat(inputSE.split(",")[0]);
    const s = parseFloat(inputSE.split(",")[1]);
    if (!isValidInput) {
      alert("Please enter two numbers separated by a comma into each field.");
    } else {
      setBound_W(w);
      setBound_N(n);
      setBound_E(e);
      setBound_S(s);
      setIsNewBounds(isNewBounds == true ? false : true);
      // setInputNW("");
      // setInputSE("");
      toggleBoundsFormVisbility();
    }
  }
  function toggleBoundsFormVisbility() {
    if (boundsFormVisibility) {
      formRef.current.style.display = "none";
      setBoundsFormVisibility(false);
    } else {
      formRef.current.style.display = "flex";
      setBoundsFormVisibility(true);
    }
  }
  function cancelForm() {
    formRef.current.style.display = "none";
    setBoundsFormVisibility(false);
    // setInputNW("");
    // setInputSE("");
  }
  function handleGetDirections(data) {
    if (isValidInput()) {
      updateBounds();
    }
    window.open(
      `https://www.google.com/maps/dir/${origin}/${getRandomFloat(
        bound_E,
        bound_W
      )},${getRandomFloat(bound_S, bound_N)}/data=${data}`,
      "_blank"
    );
  }

  return (
    <>
      <div className="buttons-wrapper">
        <button
          className="material-symbols-rounded"
          onClick={() =>
            handleGetDirections("!3m1!4b1!4m7!4m6!1m3!2m2!1d-121!2d37!1m0!3e0")
          }
        >
          directions_car
        </button>
        <button
          className="material-symbols-rounded"
          onClick={() =>
            handleGetDirections("!3m1!4b1!4m7!4m6!1m3!2m2!1d-121!2d37!1m0!3e3")
          }
        >
          directions_bus
        </button>
        <button
          className="material-symbols-rounded"
          onClick={() =>
            handleGetDirections("!3m1!4b1!4m7!4m6!1m3!2m2!1d-121!2d37!1m0!3e2")
          }
        >
          directions_walk
        </button>
        <button
          className="material-symbols-rounded"
          onClick={() => handleGetDirections("!4m2!4m1!3e1")}
        >
          directions_bike
        </button>
        <button
          className="material-symbols-rounded bounds-button"
          onClick={toggleBoundsFormVisbility}
        >
          crop_free
        </button>
      </div>
      <div className="bounds-form-wrapper" ref={formRef}>
        <div className="form-ui-wrapper">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="NW corner (lat, long)"
              value={inputNW}
              onChange={(e) => updateInputNW(e)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="SE corner (lat, long)"
              value={inputSE}
              onChange={(e) => updateInputSE(e)}
            />
          </div>
          <div className="form-actions-wrapper">
            <button className="material-symbols-rounded" onClick={updateBounds}>
              check
            </button>
            <button className="material-symbols-rounded" onClick={cancelForm}>
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
