import React, { useEffect, useRef, useState } from "react"
import '../style/flights.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client"


const FlightsInterface = () => {

    // const [ message, setMessage ] = useState({ message: "", name: "" })
	// const [ chat, setChat ] = useState([])

    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});

    useEffect(() => {
        console.log("hola dentro del chat")
        

        // socket.on("CHAT", (data) => {
        //     console.log(data)
        //     setChat([ ...chat, data ])
        //     console.log(chat)
        //     //console.log("datos vuelos"); // true
        //   });

    });


    return (
        <div className="flights-container">
            <h3>Flights Information</h3>
            
            <div className="flights-info-container">

            
            </div>
        </div>
    )
}

export default FlightsInterface;