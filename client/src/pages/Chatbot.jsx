import { useState, useRef, useEffect } from 'react';
import { Send, Mic, RotateCcw } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

const quickReplies = [
  { label: '💧 Paani dena hai kya?', text: 'Paani dena hai kya?' },
  { label: '🌾 Aaj kya karu?', text: 'Aaj kya karu?' },
  { label: '🌡️ Mausam kaisa hai?', text: 'Mausam kaisa hai?' },
  { label: '🌿 Khad kab daalein?', text: 'Khad kab daalein?' },
  { label: '🐛 Keet lag gaye!', text: 'Keet lag gaye!' },
  { label: '💰 Profit kitna hoga?', text: 'Profit kitna hoga?' },
];

export default function Chatbot() {
  const { sendChatMessage, profile } = useFarm();
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: `🙏 Namaste ${profile?.name || 'Kisan Bhai'}!\n\nMain aapka Eco Farm AI assistant hoon. Koi bhi farming sawaal poochein – Hindi ya Hinglish mein!\n\nNeeche diye gaye buttons pe click karein ya apna sawaal type karein:`,
      time: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(m => [...m, { from: 'user', text: msg, time: new Date() }]);
    setInput('');
    setTyping(true);
    try {
      const data = await sendChatMessage(msg);
      setTimeout(() => {
        setMessages(m => [...m, { from: 'bot', text: data.response, time: new Date() }]);
        setTyping(false);
      }, 700);
    } catch {
      setTimeout(() => {
        setMessages(m => [...m, { from: 'bot', text: '⚠️ Server se connect nahi ho pa raha. Thodi der baad try karein.', time: new Date() }]);
        setTyping(false);
      }, 700);
    }
  };

  const reset = () => setMessages([{
    from: 'bot',
    text: `🙏 Namaste ${profile?.name || 'Kisan Bhai'}! Naya conversation shuru karte hain. Koi sawaal poochein!`,
    time: new Date()
  }]);

  const fmt = (d) => d.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] lg:h-[calc(100vh)] bg-surface">
      {/* Header */}
      <div className="bg-eco-deeper text-white px-4 py-3 flex items-center gap-3 flex-shrink-0 lg:ml-0">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">🤖</div>
        <div>
          <div className="font-bold">Eco Farm Assistant</div>
          <div className="text-xs text-eco-base flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            Online | Hindi/Hinglish Support
          </div>
        </div>
        <button onClick={reset} className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors" title="Reset chat">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {m.from === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-eco-light flex items-center justify-center text-base flex-shrink-0">🤖</div>
            )}
            <div className="max-w-[75%]">
              <div className={m.from === 'user' ? 'chat-user' : 'chat-bot'} style={{ whiteSpace: 'pre-line', fontSize: '14px', lineHeight: '1.6' }}>
                {m.text}
              </div>
              <div className={`text-xs text-eco-dark/40 mt-1 ${m.from === 'user' ? 'text-right' : 'text-left'}`}>
                {fmt(new Date(m.time))}
              </div>
            </div>
            {m.from === 'user' && (
              <div className="w-8 h-8 rounded-full bg-eco-dark flex items-center justify-center text-base flex-shrink-0">👤</div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-eco-light flex items-center justify-center text-base flex-shrink-0">🤖</div>
            <div className="chat-bot flex gap-1 items-center px-4 py-3">
              <span className="w-2.5 h-2.5 bg-eco-base rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2.5 h-2.5 bg-eco-base rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2.5 h-2.5 bg-eco-base rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 border-t border-eco-light bg-white">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickReplies.map((q, i) => (
            <button
              key={i}
              onClick={() => send(q.text)}
              className="flex-shrink-0 text-xs bg-eco-light text-eco-dark px-3 py-1.5 rounded-full hover:bg-eco-base hover:text-white transition-colors font-medium"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-eco-light bg-white flex gap-2 items-end flex-shrink-0">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Apna sawaal Hindi ya English mein likhein..."
          rows={1}
          className="flex-1 border border-eco-light rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-eco-base text-sm resize-none"
          id="chatbot-input"
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim()}
          className="w-11 h-11 bg-eco-dark text-white rounded-xl flex items-center justify-center hover:bg-eco-mid transition-colors disabled:opacity-50 flex-shrink-0"
          id="chatbot-send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
