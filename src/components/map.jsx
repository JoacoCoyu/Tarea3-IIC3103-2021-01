import React, { useEffect, useRef, useState } from "react"
import '../style/map.css';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from "socket.io-client"

const MapInterface = () => {

    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});

    useEffect(() => {
        // socket.on("POSITION", (data) => {
        //     //console.log(data)
        //     console.log("datos vuelos"); // true
        //   });
          
    });

    return (
        <div className="map-container">
            <h1>Tarea 3 - IIC3103</h1>
            <h3>Live Map</h3>
            <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )

}

export default MapInterface;
