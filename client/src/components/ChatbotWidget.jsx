import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

const quickReplies = [
  'Aaj kya karu?',
  'Paani dena hai kya?',
  'Mausam kaisa hai?',
  'Khad kab daalein?',
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '🙏 Namaste! Main aapka Eco Farm AI assistant hoon. Koi sawaal poochein!', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const { sendChatMessage } = useFarm();

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
      }, 600);
    } catch {
      setTimeout(() => {
        setMessages(m => [...m, { from: 'bot', text: '🤖 Server se connect nahi ho pa raha. Baad mein try karein.', time: new Date() }]);
        setTyping(false);
      }, 600);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fab pulse-green"
        onClick={() => setOpen(!open)}
        aria-label="Open Chatbot"
        id="chatbot-fab"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[500px] flex flex-col bg-white rounded-2xl shadow-2xl border border-eco-light z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-eco-dark text-white px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">🤖</div>
            <div>
              <div className="font-semibold text-sm">Eco Farm Assistant</div>
              <div className="text-xs text-eco-base flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                Online
              </div>
            </div>
            <Link
              to="/chatbot"
              className="ml-auto text-xs text-eco-base hover:text-white underline"
              onClick={() => setOpen(false)}
            >
              Full screen
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface min-h-[200px] max-h-[300px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={m.from === 'user' ? 'chat-user' : 'chat-bot'} style={{ whiteSpace: 'pre-line', fontSize: '13px' }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="chat-bot flex gap-1 items-center px-4 py-3">
                  <span className="w-2 h-2 bg-eco-base rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-eco-base rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-eco-base rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="px-3 pt-2 flex gap-1.5 overflow-x-auto pb-1">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                className="flex-shrink-0 text-xs bg-eco-light text-eco-dark px-2.5 py-1 rounded-full hover:bg-eco-base hover:text-white transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-eco-light flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Sawaal likhein..."
              className="flex-1 text-sm border border-eco-light rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-base"
              id="widget-chat-input"
            />
            <button
              onClick={() => send()}
              className="w-9 h-9 bg-eco-dark text-white rounded-xl flex items-center justify-center hover:bg-eco-mid transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
