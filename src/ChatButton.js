import React, { useState, useEffect } from 'react';
import './ChatButton.css';

const ChatButton = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState('');
  const [ previousChats, setPreviousChats] = useState([]);
  const [ currentTitle, setCurrentTitle] = useState(null);

  const [isChatOpen, setChatOpen] = useState(false);
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
    if (value.trim() !== '') {
      const newMessage = {
        content: value,
        isSentByMe: true
      };
      setChatLog([...chatLog, newMessage]);
      setValue('');
    }
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json();
      setMessage(data.choices[0].message)
      console.log(message);
    } catch(error){
      console.error(error);
    }
  }

    useEffect(() => {
      // console.log(currentTitle, value, message)
      if (!currentTitle && message) {
        setCurrentTitle(value)
      }
      if (currentTitle && value && message){
        setPreviousChats(prevChats => (
          [...prevChats,
            {
              title: currentTitle,
              role: "user",
              content: value
            },
            {
              title: currentTitle,
              role: message.role,
              content: message.content
            }
        ]
        ))
      }
    }, [message, currentTitle])

    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle );
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));

  return (
    <div className={`chat-button ${isChatOpen ? 'open' : ''}`}>
      {isChatOpen ? (
        <div className="chat-window">
          <div className="chat-log">
            {chatLog.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.isSentByMe ? 'sent' : 'received'}`}>
                {msg.content}
              </div>
            ))}
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
