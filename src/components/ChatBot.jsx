import React, { useState } from 'react';

export default function ChatBot() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [listening, setListening] = useState(false);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput };

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_input: userInput,
          history: chatHistory,
        }),
      });

      const data = await res.json();
      const botMessage = { role: 'assistant', content: data.bot_reply };

      setChatHistory([...chatHistory, newMessage, botMessage]);
      setUserInput('');

      const utterance = new SpeechSynthesisUtterance(data.bot_reply);
      utterance.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setChatHistory([
        ...chatHistory,
        newMessage,
        { role: 'assistant', content: '⚠️ Error contacting server.' },
      ]);
    }
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognition.start();
  };

  const stopVoice = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 via-[#fff0f5] to-white px-4 py-10 overflow-hidden">
      
      {/* 🌸 Background Blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-pink-200 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-rose-300 opacity-20 rounded-full blur-3xl z-0" />

      {/* 📦 Chat Container */}
      <div className="relative z-10 max-w-2xl w-full mx-auto bg-white bg-opacity-90 backdrop-blur-md shadow-2xl border border-pink-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
  🛡️ Women Safety ChatBot{" "}
  <span className="text-base font-normal text-pink-600">
    (provides you safety tips)
  </span>
</h2>


        {/* 💬 Input Area */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            value={userInput}
            onChange={handleInputChange}
            className="flex-1 border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Type or speak your safety concern..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSend}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              Send
            </button>
            <button
              onClick={startListening}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              🎤 {listening ? 'Listening...' : 'Voice'}
            </button>
            <button
              onClick={stopVoice}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              🛑 Stop
            </button>
          </div>
        </div>

        {/* 🧾 Chat History */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 max-h-80 overflow-y-auto space-y-3">
          {[...chatHistory].reverse().map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md ${
                msg.role === 'user'
                  ? 'bg-pink-100 text-right text-black'
                  : 'bg-white text-left text-pink-700'
              }`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

