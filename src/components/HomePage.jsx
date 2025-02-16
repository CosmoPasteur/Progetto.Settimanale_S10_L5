// import { Alert } from "react-bootstrap";

import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

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

        const giornoPerGiorno = [];
        const seenDates = new Set();

        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // Prende solo la data giorno
          const hour = item.dt_txt.split(" ")[1]; //Prende l'ora -- h6 --

          if (!seenDates.has(date) && hour === "12:00:00") {
            seenDates.add(date);
            giornoPerGiorno.push(item);
          }
        });

        setMeteo(giornoPerGiorno); // Salvataggio e aggiornamento dei dati
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
      <span>Previsioni Meteo:</span>
      <ListGroup className="text-start ">
        <Container fluid className="d-flex justify-content-center">
          <Row>
            <Col>
              {meteo.slice(0, 5).map((list, index) => (
                <ListGroupItem key={index}>
                  <p>{new Date(list.dt_txt).toLocaleString()}</p>
                  <strong>Previsione:</strong> {list.weather[0].description}{" "}
                  <img //per vedere le icone meteo
                    src={`https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}
                    alt={list.weather[0].description}
                    style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                  />
                  ,<strong> {list.main.temp}°C</strong> ,
                </ListGroupItem>
              ))}
            </Col>
          </Row>
        </Container>
      </ListGroup>
    </div>
  );
}
export default HomePage;
