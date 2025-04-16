"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './chatbot.module.css';
import VoiceAssistant from './voice-assistant';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I'm Ashkan's virtual assistant. How can I help you today?" }
  ]);
  
  // Add a function to provide portfolio information
  const getPortfolioResponse = () => {
    return `
      I'd be happy to tell you about Ashkan's background and skills!

      Ashkan is a software engineer with expertise in full-stack development. 
      His technical skills include:
      • Frontend: React, Next.js, TypeScript, HTML/CSS
      • Backend: Node.js, Express, Python
      • Database: MongoDB, PostgreSQL
      • Cloud: AWS, Azure
      
      He has worked on several notable projects including:
      • A real-time data visualization dashboard for business analytics
      • An AI-powered chatbot system (like the one you're using now!)
      • E-commerce platforms with integrated payment systems
      
      Ashkan has a Bachelor's degree in Computer Science and has worked with companies in the tech and finance sectors.
      
      Would you like to know more about his specific projects or skills?
    `;
  };
  
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Safe scroll function to avoid errors
  const safelyScrollToBottom = () => {
    if (messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.error('Error scrolling:', error);
        messagesEndRef.current.scrollIntoView();
      }
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    safelyScrollToBottom();
  }, [messages]);

  // Debug messages state changes
  useEffect(() => {
    console.log('Messages state updated:', messages);
  }, [messages]);

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input if it's from the text field
    if (messageText === input) {
      setInput('');
    }
    
    setIsLoading(true);
    
    try {
      // Handle simple greetings directly without API call for faster response
      const simpleGreetings = ['hi', 'hello', 'hey', 'greetings'];
      if (simpleGreetings.includes(messageText.toLowerCase().trim())) {
        // Add a small delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'assistant', content: "Hello! How can I help you today?" }
        ]);
        
        setIsLoading(false);
        return;
      }
      
      // Handle portfolio-related queries directly
      if (messageText.toLowerCase().includes('portfolio') || 
          messageText.toLowerCase().includes('background') || 
          messageText.toLowerCase().includes('skills') ||
          messageText.toLowerCase().includes('experience')) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'assistant', content: getPortfolioResponse() }
        ]);
        
        setIsLoading(false);
        return;
      }
      
      console.log('Sending message to API:', messageText);
      
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      // Add assistant response to chat
      if (data && typeof data.message === 'string') {
        // Use a function to update state to ensure we're working with the latest state
        setMessages(prevMessages => {
          console.log('Adding assistant response to messages:', data.message);
          return [...prevMessages, { role: 'assistant', content: data.message }];
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API call error:', error);
      
      // Provide a fallback response
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          role: 'assistant', 
          content: 'Sorry, there was an error processing your request. Please try again later.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceMessage = (message: string) => {
    handleSendMessage(message);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className={styles.chatbotContainer} role="region" aria-label="Chat with Ashkan">
      <div className={styles.chatHeader}>
        <h3 id="chat-title">Virtual Assistant</h3>
      </div>
      
      <div 
        className={styles.messagesContainer} 
        aria-live="polite" 
        aria-describedby="chat-title"
      >
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.messageAvatar}>
              {msg.role === 'user' ? (
                <Image 
                  src="/img/avatar-user.png" 
                  alt="User" 
                  width={40} 
                  height={40} 
                  style={{ width: 'auto', height: 'auto' }}
                  className={styles.avatarImage}
                />
              ) : (
                <Image 
                  src="/img/avatar-bot.png" 
                  alt="Ashkan" 
                  width={40} 
                  height={40} 
                  style={{ width: 'auto', height: 'auto' }}
                  className={styles.avatarImage}
                />
              )}
            </div>
            <div className={styles.messageContent}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.messageAvatar}>
              <Image 
                src="/img/avatar-bot.png" 
                alt="Ashkan" 
                width={40} 
                height={40} 
                style={{ width: 'auto', height: 'auto' }}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
          aria-label="Message input"
        />
        <button 
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
          </svg>
        </button>
        <button 
          onClick={toggleListening}
          disabled={isLoading}
          className={isListening ? styles.listeningButton : ''}
          aria-label="Voice input"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
          </svg>
        </button>
      </div>
      
      <VoiceAssistant 
        onMessage={handleVoiceMessage}
        isListening={isListening}
        setIsListening={setIsListening}
      />
    </div>
  );
};

export default Chatbot;
