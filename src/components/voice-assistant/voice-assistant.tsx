"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null) // Add error state
  const router = useRouter()
  
  // Check if SpeechRecognition is available
  const SpeechRecognition = typeof window !== 'undefined' 
    ? window.SpeechRecognition || window.webkitSpeechRecognition 
    : null
  
  const recognition = SpeechRecognition ? new SpeechRecognition() : null
  
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
      const recognition = new SpeechRecognition(); // Use recognition directly
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      // Specify the correct type for the event parameter
      recognition.onresult = (event: any) => { // Use 'any' as a temporary workaround
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        handleCommand(command);
      };
    
    // Use 'any' for the error event parameter as a temporary workaround
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      setIsListening(false)
      toast.error('Voice recognition error. Please try again.')
    }
    }
    
    recognition.onend = () => {
      setIsListening(false)
    }
    
    return () => {
      if (recognition) {
        recognition.abort()
      }
    }
  }, [recognition])
  
  const toggleListening = () => {
    if (!recognition) {
      toast.error('Speech recognition is not supported in your browser')
      return
    }
    
    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
      toast.info('Listening... Try saying "go to home" or "open about"')
    }
  }
  
  const handleCommand = (command: string) => { // Specify 'string' type for the command parameter
    // Navigation commands
    if (command.includes('go to home') || command.includes('open home')) {
      router.push('/')
      speak('Navigating to home page')
    } else if (command.includes('go to about') || command.includes('open about')) {
      router.push('/about')
      speak('Navigating to about page')
    } else if (command.includes('go to services') || command.includes('open services')) {
      router.push('/services')
      speak('Navigating to services page')
    } else if (command.includes('go to portfolio') || command.includes('open portfolio')) {
      router.push('/portfolio')
      speak('Navigating to portfolio page')
    } else if (command.includes('go to blog') || command.includes('open blog')) {
      router.push('/blog')
      speak('Navigating to blog page')
    } else if (command.includes('go to skills') || command.includes('open skills')) {
      router.push('/skills')
      speak('Navigating to skills page')
    } else if (command.includes('go to contact') || command.includes('open contact')) {
      router.push('/contact')
      speak('Navigating to contact page')
    } 
    // Information commands
    else if (command.includes('who are you') || command.includes('tell me about yourself')) {
      speak('I am a voice assistant for this portfolio website. I can help you navigate through different sections.')
    } else if (command.includes('what can you do') || command.includes('help')) {
      speak('I can help you navigate to different pages. Try saying go to home, open about, or similar commands.')
    } else {
      speak('Sorry, I did not understand that command. Try saying go to home or open about.')
    }
  }
  
  const speak = (text: string) => { // Specify 'string' type for the text parameter
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }
  
  return (
    // Changed from bottom-4 right-4 to top-20 right-4 to position it in the top-right
    <div className="fixed top-20 right-4 z-50 md:top-10 md:right-10 lg:top-5 lg:right-5">
      <div className="flex flex-col items-end gap-2">
        {transcript && isListening && (
          <div className="bg-background border rounded-lg p-2 shadow-lg max-w-[200px] text-sm md:max-w-[300px] lg:max-w-[400px]">
            {transcript}
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}
        <Button 
          variant={isListening ? "destructive" : "default"}
          size="icon" 
          onClick={toggleListening}
          className="rounded-full h-12 w-12 shadow-lg"
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}

export default VoiceAssistant