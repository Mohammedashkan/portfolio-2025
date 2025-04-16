import React from 'react';
import Chatbot from '@/components/chatbot/chat';

export default function ChatPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Chat with Ashkan</h1>
      <Chatbot />
    </main>
  );
}