import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 聊天列表数据
const chatList = [
  { id: 1, name: '张三', avatar: '👦', lastMsg: '今晚一起去图书馆吗？', time: '10:30' },
  { id: 2, name: '李四', avatar: '👧', lastMsg: '作业发我一下', time: '09:45' },
  { id: 3, name: '王五', avatar: '👨', lastMsg: '明天早八记得占座', time: '昨天' },
];

// 默认消息
const defaultMessages = [
  { id: 1, content: '你好呀!', sender: 'other', time: '10:20' },
  { id: 2, content: '你好~有什么事吗?', sender: 'me', time: '10:22' },
];

export default function Chat() {
  const navigate = useNavigate();
const [activeChat] = useState(chatList[0]);
  const [messages, setMessages] = useState(defaultMessages);
  const [inputMsg, setInputMsg] = useState('');
  const [showMore, setShowMore] = useState(false);

  // 发送消息
  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      content: inputMsg,
      sender: 'me',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
    
    // 模拟对方回复
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        content: '收到啦～',
        sender: 'other',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  // 更多功能面板数据
  const moreFeatures = [
    { id: 1, name: '相册', icon: '🖼️' },
    { id: 2, name: '拍摄', icon: '📷' },
    { id: 3, name: '视频通话', icon: '📹' },
    { id: 4, name: '位置', icon: '📍' },
    { id: 5, name: '红包', icon: '🧧' },
    { id: 6, name: '礼物', icon: '🎁' },
    { id: 7, name: '转账', icon: '💸' },
    { id: 8, name: '语音输入', icon: '🎤' },
  ];

  // TabBar 切换
  const switchTab = (path: string) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <div className="nav-bar nav-chat">
        <div className="nav-back">←</div>
        <div className="nav-title">{activeChat.name}</div>
        <div className="nav-icon">⋮</div>
      </div>

      {/* 聊天内容区 */}
      <div className="chat-content">
        <div className="chat-time">今天 10:00</div>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            {msg.sender === 'other' && <div className="chat-avatar">{activeChat.avatar}</div>}
            <div className="chat-bubble">{msg.content}</div>
            {msg.sender === 'me' && <div className="chat-avatar">👤</div>}
          </div>
        ))}
      </div>

      {/* 底部输入区 + 功能面板 */}
      <div className="chat-bottom">
        <div className="chat-input-row">
          <div className="input-icon">📢</div>
          <input
            type="text"
            className="chat-input"
            placeholder="输入消息..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <div className="input-icon" onClick={() => setShowMore(!showMore)}>😊</div>
          <div className="input-icon" onClick={() => setShowMore(!showMore)}>➕</div>
        </div>

        {/* 更多功能面板 */}
        {showMore && (
          <div className="more-panel">
            <div className="more-grid">
              {moreFeatures.map(item => (
                <div key={item.id} className="more-item">
                  <div className="more-icon">{item.icon}</div>
                  <div className="more-name">{item.name}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', padding: '10px', fontSize: '12px', color: '#999' }}>
              ⚪ ⚪
            </div>
          </div>
        )}
      </div>

      {/* 底部 TabBar */}
      <div className="tab-bar">
        <div className="tab-bar-item active" onClick={() => switchTab('/chat')}>
          <span className="tab-bar-icon">💬</span>
          <span>微信</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/contact')}>
          <span className="tab-bar-icon">👥</span>
          <span>通讯录</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/errands')}>
          <span className="tab-bar-icon">🚴</span>
          <span>跑腿</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/discover')}>
          <span className="tab-bar-icon">🔍</span>
          <span>发现</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/mine')}>
          <span className="tab-bar-icon">👤</span>
          <span>我</span>
        </div>
      </div>
    </div>
  );
}