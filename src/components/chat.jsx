import React, { useEffect, useRef, useState } from "react"
import '../style/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"


const ChatInterface = () => {

    const [ state, setState ] = useState({ name: "", message: "" })
    const [ chat, setChat ] = useState([])
    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});


    useEffect(() => {
        //console.log(state)
        socket.on("CHAT", (data) => {
            //console.log(data)
            setChat([ ...chat, data ])
            console.log(chat)
          });
    }, []);


    const onTextChange = (e) => {
		setState({name:"piloto1", message: e.target.value})
        //console.log(e.target.value)
	}

    const onMessageSubmit = (e) => {
		const { name, message } = state
		socket.emit("CHAT", {name, message})
		e.preventDefault()
		setState({ message: "", name })
	}

    const renderChat = () => {
		return chat.map(msg_data => (
			<div className="msg-container">
				<h4>
                [{Date(msg_data["date"])}] {msg_data["name"]}: {msg_data["message"]}
				</h4>
			</div>
		))
	}

    return (
        <div className="chat-container">
            <div className="messages-container">
                {renderChat()}
            </div>
            <form
            onSubmit={onMessageSubmit}>
                <div className="input-container">
                    <div className="input-group flex-nowrap">
                        <input type="text" className="form-control" placeholder="Write a message ..." 
                        aria-label="Username" aria-describedby="addon-wrapping"
                        value={state.message} onChange={onTextChange} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChatInterface;


{/* <div className="chat-container">

<div className="messages-container">
    <h3>mensajes</h3>
</div>
    <div className="input-container">
        <div className="input-group flex-nowrap">
            <input type="text" className="form-control" placeholder="Write a message ..." 
            aria-label="Username" aria-describedby="addon-wrapping"
            value={state.message} onChange={onTextChange}} />
        </div>
    </div>

    <div className="buttom-container">
        <button 
        type="submit" 
        className="btn btn-primary mb-3">Send Message</button>
    </div>
</div> */}

