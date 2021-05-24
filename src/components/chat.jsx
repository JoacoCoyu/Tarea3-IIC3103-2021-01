import React, { useEffect, useState } from "react"
import '../style/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Popup} from "reactjs-popup";
import io from "socket.io-client"


const ChatInterface = () => {
    const [ nickname, setNickname ] = useState("Test Pilot")
    const [ state, setState ] = useState({ name: "", message: "" })
    const [ chat, setChat ] = useState([])
    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});

    useEffect(() => {
        socket.on("CHAT", (data) => {
                setChat(chat => [ ...chat, data])
                //console.log(chat)
            //}
          });
          return () => socket.disconnect()
        }, 
    []);

    const onNicknameChange = (e) => {
		setNickname(e.target.value)
        //console.log(state)
	}

    const onNicknameSubmit = (e) => {
        //console.log("nuevo nickname", e.target.value)
        e.preventDefault()
		setNickname(e.target.value)
	}

    const onTextChange = (e) => {
		setState({name: nickname, message: e.target.value})
        console.log(state)
	}

    const onMessageSubmit = (e) => {
        console.log("mensaje enviado: ", state)
		const { name, message } = state
		socket.emit("CHAT", {name, message})
		e.preventDefault()
		setState({ message: "", name })
	}

    const renderChat = () => {

		return chat.map((msg_data, index) => (
			<div key={index} className="msg-container">

				<p>
                [{String(Date(msg_data["date"])).slice(0, String(Date(msg_data["date"])).length-25)}] {msg_data["name"]}: {msg_data["message"]}
				</p>
			</div>
		))
	}

    return (
        <div className="chat-container">
            <div className="other-msg-container">
                {renderChat()}
            </div>

            <div className="input-container">
                <form
                className="form-nickname"
                onSubmit={onNicknameSubmit}>
                    <div className="nickname-container">
                        <input type="text" className="form-control" placeholder="Choose a nickname" 
                        aria-label="Username" aria-describedby="addon-wrapping"
                        value={nickname} onChange={onNicknameChange} />
                    </div>
                </form>

                <Popup
                    trigger={<div className="nickname-button-container"><button 
                    type="submit" 
                    className="btn btn-primary mb-3">Set Nickname</button></div>}
                    position="top"
                    closeOnDocumentClick>
                    <div className="popup-nickname-container">
                        New nickname has been set correctly
                    </div>
                </Popup>

                <form
                className="form-message"
                onSubmit={onMessageSubmit}>
                    <div className="messages-container">
                        <div className="input-group flex-nowrap">
                            <input type="text" className="form-control" placeholder="Write a message ..." 
                            aria-label="Username" aria-describedby="addon-wrapping"
                            value={state.message} onChange={onTextChange} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatInterface;

