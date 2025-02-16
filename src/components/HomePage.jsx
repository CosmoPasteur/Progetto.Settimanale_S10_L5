// import { Alert } from "react-bootstrap";

import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
      .then((resp) => {
        if (resp.ok) {
          return resp.json(); //restituisce i dati in una promise
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((getData) => {
        if (getData.length > 0) {
          setLon(getData[0].lon);
          setLat(getData[0].lat);
          // getCordinate(getData[0].lat, getData[0].lon);
        } else {
          console.error("Nessuna coordinata trovata");
        }
      })
      // console.log("RISPOSTA JSON", getData))
      .catch((e) => {
        console.error("Errore!", e);
      });
  };

  return (
    <>
      <h1>Che Meteo fa</h1>
      <h2>{searchName}</h2>
      <ListGroup>
        <ListGroupItem>
          <p></p>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}
export default HomePage;
