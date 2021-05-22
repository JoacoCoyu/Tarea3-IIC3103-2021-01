import React, { useEffect, useRef, useState } from "react"
import '../style/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client"


const ChatInterface = () => {

    const [ message, setMessage ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

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


    const onMessageSubmit = message => {
        console.log(message)
        
        //socket.emit("CHAT", {name, message})
    };


    return (
        <div className="chat-container">

            <div className="messages-container">
                <h3>mensajes</h3>
            </div>

                <div className="input-container">
                    <div className="input-group flex-nowrap">
                        <input type="text" className="form-control" placeholder="Write something ..." 
                        aria-label="Username" aria-describedby="addon-wrapping"
                        onChange={() => onMessageSubmit()} />
                    </div>
                </div>

                <div className="buttom-container">
                    <button 
                    type="submit" 
                    className="btn btn-primary mb-3">Send Message</button>
                </div>
        </div>
    )
}

export default ChatInterface;

{/* <div className="chat-container">
            <form className="chat-form">
                <div className="input-container">
                    <div className="input-group flex-nowrap">
                        <input type="text" className="form-control" placeholder="Write something ..." 
                        aria-label="Username" aria-describedby="addon-wrapping"
                        onChange={() => onMessageSubmit()} />
                    </div>
                </div>

                <div className="buttom-container">
                    <button 
                    type="submit" 
                    className="btn btn-primary mb-3">Send Message</button>
                </div>
            </form>
        </div> */}


