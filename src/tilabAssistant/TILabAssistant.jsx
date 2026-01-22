import React, { useState, useRef, useEffect } from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import { COLORS, SPACING } from '../constants/styles';
import { delay } from '../utils/delay';
import './TILabAssistant.css';

const TILabAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // FUTURO: Integrar endpoint real del asistente IA
  const sendMessageToAssistant = async (message) => {
    // TODO: Integrar endpoint real del asistente IA
    // Por ahora, simulamos una respuesta
    await delay(500);
    return 'Hola, ¿en qué puedo ayudarte?';
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simular respuesta del bot
    const botResponse = await sendMessageToAssistant(input);
    
    const botMessage = {
      id: Date.now() + 1,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <LayoutWithSidebar>
      <div className="tilab-assistant-container">
        <h2 className="tilab-assistant-title">TILab Assistant</h2>
        
        <div className="chat-container">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>¡Hola! Soy TILab Assistant, tu asistente personal.</p>
                <p>¿En qué puedo ayudarte hoy?</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-timestamp">
                    {message.timestamp}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              className="send-button"
              disabled={input.trim() === ''}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
};

export default TILabAssistant;