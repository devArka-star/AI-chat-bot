import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
// Import the centralized axios instance
import api from '../api'; 

function ChatWindow({ botName, selectedLanguage, onCloseChat, botAvatar, chatId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageEndRef = useRef(null);

  // Load chat history when chatId changes or component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (chatId) {
        try {
          const response = await api.get(`/api/recent-chats/details/${chatId}`);
          if (response.data && response.data.messages) {
            setMessages(response.data.messages);
          }
        } catch (err) {
          console.error("Error loading chat:", err);
        }
      } else {
        // Default welcome message if no chat is active
        setMessages([{ id: 1, sender: 'bot', text: `Hi there! 👋 How can I help you in ${selectedLanguage} today?` }]);
      }
    };

    fetchChatHistory();
  }, [chatId, selectedLanguage]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const currentInput = inputMessage;
    const userMsg = { id: Date.now(), sender: 'user', text: currentInput };
    
    // Update local state immediately for responsiveness
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    try {
      const response = await api.post('/api/chat', { 
        message: currentInput, 
        chatId: chatId 
      });

      const data = response.data;
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('AI Communication Error:', error);
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again." 
      }]);
    }
  };

  return (
    <div className="d-flex flex-column h-100 bg-white">
      <div className="phone-screen-header-active px-3 py-2 text-white d-flex align-items-center justify-content-between shadow-sm">
        <div className="d-flex align-items-center gap-2">
          {botAvatar ? (
            <img 
              // Note: Ensure this path is relative to your API base URL or absolute as needed
              src={`${process.env.REACT_APP_API_BASE_URL}${botAvatar}`} 
              alt={botName} 
              className="rounded-circle" 
              style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
            />
          ) : (
            <div className="active-dot-avatar bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold text-uppercase">
              {botName ? botName.charAt(0) : 'B'}
            </div>
          )}
          
          <div>
            <h6 className="mb-0 fw-bold small text-truncate" style={{ maxWidth: '160px' }}>{botName}</h6>
            <small className="extra-small text-white-50">🟢 Online</small>
          </div>
        </div>
        <Button variant="link" className="text-white text-decoration-none p-0 fw-bold fs-5" onClick={onCloseChat}>
          ✕
        </Button>
      </div>

      <div className="flex-grow-1 p-3 overflow-y-auto bg-light d-flex flex-column gap-2" style={{ maxHeight: '380px' }}>
        {messages.map((msg, index) => (
          <div key={msg.id || index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div 
              className={`p-2 rounded-3 ${msg.sender === 'user' ? 'bg-primary' : 'bg-white border'}`}
              style={{
                color: msg.sender === 'user' ? '#FFFFFF' : '#212529',
                fontSize: '0.9rem',
                maxWidth: '85%'
              }}
            >
              <ReactMarkdown>
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <Form onSubmit={handleSendMessage} className="p-2 border-top bg-white d-flex gap-2 align-items-center">
        <Form.Control
          type="text"
          placeholder="Write a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="rounded-pill bg-light border-0 px-3 extra-small py-2"
        />
        <Button type="submit" variant="primary" size="sm" className="rounded-circle px-2 py-1">
          ➔
        </Button>
      </Form>
    </div>
  );
}

export default ChatWindow;