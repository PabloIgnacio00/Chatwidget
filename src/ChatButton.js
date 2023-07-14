import React, { useState } from 'react';
import './ChatButton.css';

const ChatButton = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleButtonClick = () => {
    setChatOpen(!isChatOpen);
  };

  const handleCloseClick = () => {
    setChatOpen(false);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatLog([...chatLog, message]);
      setMessage('');
    }
  };

  return (
    <div className={`chat-button ${isChatOpen ? 'open' : ''}`}>
      {isChatOpen ? (
        <div className="chat-window">
          <div className="chat-log">
            {chatLog.map((msg, index) => (
              <div key={index} className="chat-message">
                {msg}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Escribe un mensaje..."
            className="chat-input"
          />
          <button className="send-button" onClick={handleSendMessage}>
            Enviar
          </button>
          <button className="close-button" onClick={handleCloseClick}>
            X
          </button>
        </div>
      ) : (
        <button className="open-button" onClick={handleButtonClick}>
          Abrir Chatbot
        </button>
      )}
    </div>
  );
};

export default ChatButton;
