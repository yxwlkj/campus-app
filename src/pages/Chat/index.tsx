import { useState, useRef, useEffect } from 'react';
import { Input, Button, Avatar, ScrollView } from 'antd-mobile';
import './index.css';

const initialMessages = [
  { id: 1, content: '哈喽，在吗？', sender: 'other', time: '09:15' },
  { id: 2, content: '在的，有什么事？', sender: 'me', time: '09:16' },
  { id: 3, content: '想问问校园跑腿怎么用呀？', sender: 'other', time: '09:17' },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMsg = {
      id: Date.now(),
      content: inputValue.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString().slice(0, 5),
    };

    setMessages([...messages, newMsg]);
    setInputValue('');

    setTimeout(() => {
      const replyMsg = {
        id: Date.now() + 1,
        content: '已收到你的消息，稍后回复～',
        sender: 'other',
        time: new Date().toLocaleTimeString().slice(0, 5),
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-header">
        <Avatar src="https://picsum.photos/200/200" size="small" />
        <span className="chat-title">校园客服</span>
      </div>

      <ScrollView className="chat-content" ref={scrollRef}>
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`chat-item ${msg.sender === 'me' ? 'me' : 'other'}`}
          >
            <Avatar 
              src={msg.sender === 'me' 
                ? 'https://picsum.photos/100/100?random=1' 
                : 'https://picsum.photos/100/100?random=2'
              } 
              size="mini" 
            />
            <div className="msg-bubble">
              <span className="msg-content">{msg.content}</span>
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </ScrollView>

      <div className="chat-input">
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="输入消息..."
          className="input-box"
          onPressEnter={sendMessage}
        />
        <Button type="primary" onClick={sendMessage} className="send-btn">
          发送
        </Button>
      </div>
    </div>
  );
}