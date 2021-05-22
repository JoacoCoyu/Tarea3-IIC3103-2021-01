import React, { useEffect, useRef, useState } from "react"
import '../style/flights.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client"


const FlightsInterface = () => {

	const [ flights, setFlights ] = useState([])

    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});

    useEffect(() => {
        console.log("hola dentro de flights")

        socket.emit("FLIGHTS")

        socket.on("FLIGHTS", (data) => {
            setFlights(data)
            //console.log("printing flights", flights)
          });

    });

    const renderFlights = () => {
		return flights.map(flight_data => (
			<div className="card">
                <div className="card-header">
                    <h5>{flight_data["code"]}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Flight Information</p>
                    <ul class="flight-data-list">
                        <li>Airline: {flight_data["airline"]}</li>
                        <li>Origin: {flight_data["origin"]}</li>
                        <li>Final destination: {flight_data["destination"]}</li>
                        <li>Plane: {flight_data["plane"]}</li>
                        <li>Number of seats: {flight_data["seats"]}</li>
                    </ul>
                </div>
            </div>
		))
	}

    return (
        <div className="flights-container">
            <h3>Flights Information</h3>
            <div className="flights-info-container">
                {renderFlights()}
            </div>
        </div>
    )
}

export default FlightsInterface;