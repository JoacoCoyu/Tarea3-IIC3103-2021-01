import React from 'react';
import '../style/chat.css';

const ChatInterface = () => {

    return (
        <div class="chat-container">
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="input" autocomplete="off" /><button>Send</button>
            </form>
        </div>
    )
}

export default ChatInterface;