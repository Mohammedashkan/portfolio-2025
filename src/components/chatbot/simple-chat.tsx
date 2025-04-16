import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SimpleChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I'm Ashkan's virtual assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setInput('');
    
    // Add assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: `You said: "${input}". This is a simple response.` 
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <div style={{ 
      width: '400px', 
      height: '500px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <h3>Simple Chat</h3>
      </div>
      
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.role === 'user' ? '#007bff' : '#f1f1f1',
            color: msg.role === 'user' ? 'white' : 'black',
            padding: '8px 12px',
            borderRadius: '12px',
            margin: '4px 0',
            maxWidth: '70%'
          }}>
            {msg.content}
          </div>
        ))}
      </div>
      
      <div style={{ 
        padding: '10px', 
        borderTop: '1px solid #ccc',
        display: 'flex'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          style={{ 
            marginLeft: '8px', 
            padding: '8px 16px', 
            backgroundColor: '#007bff', 
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SimpleChat;