import React, { useEffect, useState } from "react"
import '../style/map.css';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import io from "socket.io-client"
r

const checkInArray = (array, element) => {
    var response = false
    for (var i = 0; i < array.length; i++) {
        if(array[i] == element) {
            response = true
        }
      }
    return response
}

const MapInterface = () => {

    const [ flights, setFlights ] = useState([])
    const [ codeList, setCodeList ] = useState([])
    const [ posList, setPosList ] = useState([])

    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});

    useEffect(() => {

        socket.emit("FLIGHTS")
        socket.on("FLIGHTS", (data) => {
            setFlights(data)
          });

        socket.on("POSITION", (data_position) => {
            //console.log("hola dentro de POSITION")
            //console.log(data_position)
            renderAirplanes(data_position)
          });
          
    });

    const renderAirplanes = (flight) => {
        if(flight){
            var flightInclude = checkInArray(codeList, flight["code"])
            if(!flightInclude) {
                const newCodeList = codeList
                newCodeList.push(flight["code"])
                setCodeList(newCodeList)

                const newPosList = posList
                newPosList.push(flight)
                setPosList(newPosList)
            }

            else {
                posList.forEach(pos => {
                    if(pos["code"] == flight["code"]) {
                        if(pos["position"] == flight["position"]) {
                            const index = posList.indexOf(pos);
                            if (index > -1) {
                                posList.splice(index, 1);
                            }
                        }
                        else {
                            const newPos = flight["position"]
                            pos["position"] = newPos
                        }
                    }
                })
            }
        }
        // <Marker
            //     position={[-36.276456967222224, -63.540694109444445]}
            //     icon={ iconAirplane }
            //     >
            //     <Popup>
            //         {/* {flight["code"]} */}
            //         Happy flight
            //     </Popup>
            // </Marker>
        const colorOptions = { color: 'lime' }
        return posList.map(flight => (
            <CircleMarker center={flight["position"]} pathOptions={colorOptions} radius={15}>
                <Popup>
                    {flight["code"]}
                </Popup>
            </CircleMarker>
        ))
    }

    const renderLines = () => {
        const colorOptions = [{color: 'lime'}, { color: 'purple' }, { color: 'red' }, { color: 'blue' }]
        return flights.map((flight_data, index) =>(
            <Polyline pathOptions={colorOptions[index]} positions={[flight_data["origin"], flight_data["destination"]]} />
        ))
    }

    return (
        <div className="map-container">
            <h1>Tarea 3 - IIC3103</h1>
            <h3>Live Map</h3>
            <MapContainer center={[-34.82264, -58.533321]} zoom={4} scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderLines()}
                {renderAirplanes()}
            </MapContainer>
        </div>
    )

}

export default MapInterface;