// import { Alert } from "react-bootstrap";

import { useEffect, useState } from "react";

function HomePage({ searchName }) {
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const url = "http://api.openweathermap.org";
  const appid = "8487b003864068affe499b28d34f4f4f";

  useEffect(() => {
    getCordinate();
  }, [searchName]);

  const getCordinate = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}/geo/1.0/direct?q=${searchName}&appid=${appid}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1>Che Meteo fa</h1>
      <h2>{searchName}</h2>
    </>
  );
}
export default HomePage;
