import React, { useState, useEffect } from "react";

const Geolocation = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("Error retriving the Geolocation: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
  });
  return (
    <div>
      {latitude} {longitude}
    </div>
  );
};

export default Geolocation;
