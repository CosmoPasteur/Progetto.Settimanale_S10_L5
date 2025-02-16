// import { Alert } from "react-bootstrap";

import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function HomePage({ searchName }) {
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [meteo, setMeteo] = useState([]);
  const url = "http://api.openweathermap.org";
  const appid = "8487b003864068affe499b28d34f4f4f";

  useEffect(() => {
    getCordinate(); //Metodo per invocare la funzione
  }, [searchName]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      getMeteo(lat, lon); // Chiamata API per il meteo solo quando abbiamo le coordinate
    }
  }, [lat, lon]);

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
          throw new Error("errore nella chiamata"); //Codice di errore,in caso la proprietà è false
        }
      })
      .then((data) => {
        console.log("RISPOSTA DEL SERVER", data);
        if (data.length > 0) {
          setLon(data[0].lon);
          setLat(data[0].lat);
          // getCordinate(data[0].lat, data[0].lon);
        } else {
          console.error("Nessuna coordinata trovata");
        }
      })

      .catch((e) => {
        console.error("Errore!", e);
      });
  };

  const getMeteo = (lat, lon) => {
    fetch(`${url}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&lang=it`)
      .then((resp) => {
        if (!resp.ok) throw new Error("TEMPESTA! Errore durante la chiamata meteo.");
        return resp.json();
      })
      .then((data) => {
        console.log("DATI DEL METEO", data);
        setMeteo(data.list); // Salvataggio e aggiornamento dei dati
      })
      .catch((e) => console.error("Errore nel meteo", e));
  };

  return (
    <div className="text-center">
      <h1>Che Meteo fa</h1>
      <h2>{searchName}</h2>
      {lat && lon && (
        <p>
          <strong>Coordinate:</strong> {lat}, {lon}
        </p>
      )}
      <ListGroup className="text-start">
        {meteo.slice(0, 5).map((item, index) => (
          <ListGroupItem key={index}>
            {new Date(item.dt_txt).toLocaleString()} - {item.weather[0].description}, {item.main.temp}°C
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
export default HomePage;
