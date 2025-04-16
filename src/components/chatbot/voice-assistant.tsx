import React, { useState, useEffect, useRef } from 'react';

// Add type declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

// Define a Message interface
interface Message {
  role: string;
  content: string;
}

// ----- VoiceAssistant Component -----
interface VoiceAssistantProps {
  onMessage: (message: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

const VoiceAssistant = ({ onMessage, isListening, setIsListening }: VoiceAssistantProps) => {
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;

    // Check browser support for speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Get the SpeechRecognition constructor
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      // Handle speech results
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized speech:", transcript);
        if (transcript.trim()) {
          onMessage(transcript);
        }
        setIsListening(false);
      };

      // Handle errors with detailed messages
      recognition.onerror = (event: { error: string }) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'aborted') {
          console.log("Recognition aborted");
          if (isListening) {
            setError('Speech recognition was interrupted. Please try again.');
          }
        } else if (event.error === 'no-speech') {
          setError('No speech was detected. Please try again.');
        } else if (event.error === 'network') {
          setError('Network error occurred. Please check your connection.');
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
        setIsListening(false);
      };

      // When recognition ends, update the listening state
      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };
      
      // Start recognition if isListening is true, otherwise stop it
      if (isListening) {
        try {
          recognition.start();
          console.log('Voice recognition started');
        } catch (error) {
          console.error('Error starting recognition:', error);
        }
      } else {
        try {
          recognition.stop();
          console.log('Voice recognition stopped');
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    }
    
    // Cleanup function
    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      } catch (error) {
        console.error('Error cleaning up recognition:', error);
      }
    };
  }, [isListening, onMessage, setIsListening]);

  return (
    <div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {isListening && <p className="text-green-500 text-sm mt-2">Listening...</p>}
    </div>
  );
};

export default VoiceAssistant;
