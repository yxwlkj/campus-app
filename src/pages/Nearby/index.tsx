import { useState } from 'react';

const chatList = [
  { id: 1, name: '张三', avatar: '👦', lastMsg: '今晚一起去图书馆吗？', time: '10:30' },
  { id: 2, name: '李四', avatar: '👧', lastMsg: '作业发我一下', time: '09:45' },
  { id: 3, name: '王五', avatar: '👨', lastMsg: '明天早八记得占座', time: '昨天' },
];

const defaultMessages = [
  { id: 1, content: '你好呀!', sender: 'other', time: '10:20' },
  { id: 2, content: '你好~有什么事吗?', sender: 'me', time: '10:22' },
];

function Chat() {
  const [activeChat, setActiveChat] = useState(chatList[0]);
  const [messages, setMessages] = useState(defaultMessages);
  const [inputMsg, setInputMsg] = useState('');

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
  };

  return (
    <div className="wechat-container">
      <div className="wechat-header">聊天</div>
      
      <div className="page-content">
        {/* 左侧聊天列表 */}
        <div className="chat-list">
          {chatList.map(item => (
            <div
              key={item.id}
              className={`chat-list-item ${activeChat.id === item.id ? 'active' : ''}`}
              onClick={() => setActiveChat(item)}
            >
              <div className="chat-avatar">{item.avatar}</div>
              <div className="chat-info">
                <div className="chat-name">{item.name}</div>
                <div className="chat-preview">{item.lastMsg}</div>
              </div>
              <div className="chat-time">{item.time}</div>
            </div>
          ))}
        </div>

        {/* 右侧聊天窗口 */}
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.content}
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="输入消息..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>发送</button>
          </div>
        </div>
      </div>

      {/* 底部TabBar */}
      <div className="tab-bar">
        <div className="tab-bar-item active">
          <span className="tab-bar-icon">💬</span>
          <div>微信</div>
        </div>
        <div className="tab-bar-item">
          <span className="tab-bar-icon">👥</span>
          <div>通讯录</div>
        </div>
        <div className="tab-bar-item">
          <span className="tab-bar-icon">🚴</span>
          <div>跑腿</div>
        </div>
        <div className="tab-bar-item">
          <span className="tab-bar-icon">🔍</span>
          <div>发现</div>
        </div>
        <div className="tab-bar-item">
          <span className="tab-bar-icon">👤</span>
          <div>我</div>
        </div>
      </div>
    </div>
  );
}

export default Chat;