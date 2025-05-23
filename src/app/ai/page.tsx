"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AiChatPage() {
  const [messages, setMessages] = useState<{
    text: string;
    sender: 'user' | 'ai';
  }[]>([
    { text: 'Hallo! Ik ben de AI assistent. Waarmee kan ik je helpen?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' as const };
      setMessages([...messages, newMessage]);
      setInput('');
      // Simulate AI response (replace with actual AI logic later)
      setTimeout(() => {
        setMessages(currentMessages => [
          ...currentMessages,
          { text: `Je vroeg: "${input}"`, sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className="flex flex-col items-center pt-6 pb-2 bg-white shadow-sm">
        <Image src="/nokijk-logo.svg" alt="Nokijk logo" width={150} height={50} priority className="w-36 h-auto" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-xl p-3 max-w-[80%] ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Stel een vraag..."
        />
        <button
          onClick={handleSend}
          className="bg-[#92278f] text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#7a1e6c] transition-colors"
          disabled={!input.trim()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );
} 