import React, { useState } from 'react';
import styles from './Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I assist you today?', fromBot: true },
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    const newMessages = [
      ...messages,
      { text: inputValue, fromBot: false },
    ];

    setMessages(newMessages);
    setInputValue('');

    // Mock response for the chatbot
    setTimeout(() => {
      let response = '';
      if (inputValue.toLowerCase().includes('book')) {
        response = 'To book a facility, go to the Facilities section and click "Book Now" on the facility of your choice.';
      } else if (inputValue.toLowerCase().includes('ticket')) {
        response = 'To buy a ticket, go to the Events section and click "Get Ticket" on the event you’re interested in.';
      } else {
        response = 'I can assist with booking facilities or purchasing tickets. What would you like to know?';
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, fromBot: true },
      ]);
    }, 1000);
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.chatbotHeader} onClick={toggleChatbot}>
        <h3>Support Chatbot</h3>
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className={styles.chatbotBody}>
          <div className={styles.chatbotMessages}>
            {messages.map((message, index) => (
              <div key={index} className={message.fromBot ? styles.botMessage : styles.userMessage}>
                {message.text}
              </div>
            ))}
          </div>
          <div className={styles.chatbotInput}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
