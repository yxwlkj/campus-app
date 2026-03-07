import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const { id: _ } = useParams<{ id: string }>();
  const location = useLocation();
  const { name = '未知好友', avatar = '👤' } = location.state || {};

  const [messages, setMessages] = useState([
    { id: 1, content: '你好！', sender: 'other', time: '10:00' },
    { id: 2, content: '嗨，最近怎么样？', sender: 'me', time: '10:01' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // 发送消息
  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      content: inputMsg,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  // 回车发送
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
      {/* 顶部导航栏 */}
      <div style={{ 
        background: '#07c160', 
        color: '#fff', 
        padding: '12px 16px', 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>{name}</div>
        <div style={{ marginLeft: 'auto', fontSize: 18 }}>⋮</div>
      </div>

      {/* 消息列表区域 */}
      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            {m.sender === 'other' && <div style={{ fontSize: 24, marginRight: 8 }}>{avatar}</div>}
            <div style={{ maxWidth: '70%', background: m.sender === 'me' ? '#95ec69' : '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <div style={{ margin: 0, fontSize: 14 }}>{m.content}</div>
              <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 4 }}>{m.time}</div>
            </div>
            {m.sender === 'me' && <div style={{ fontSize: 24, marginLeft: 8 }}>👤</div>}
          </div>
        ))}
      </div>

      {/* 输入框区域 */}
      <div style={{ padding: 8, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
        <input
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 20, outline: 'none' }}
        />
        <button onClick={sendMessage} style={{ marginLeft: 8, padding: '8px 16px', background: '#07c160', color: '#fff', border: 'none', borderRadius: 20 }}>发送</button>
      </div>

      {/* 底部导航栏（含跑腿） */}
      <div style={{ 
        background: '#fff', 
        borderTop: '1px solid #eee', 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '8px 0' 
      }}>
        <button 
          onClick={() => navigate('/chatlist')} 
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#07c160' }}
        >
          💬 聊天
        </button>
        <button 
          onClick={() => navigate('/contacts')} 
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}
        >
          👥 通讯录
        </button>
        <button 
          onClick={() => navigate('/errand')} 
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}
        >
          🚗 跑腿
        </button>
        <button 
          onClick={() => navigate('/discover')} 
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}
        >
          🔍 发现
        </button>
        <button 
          onClick={() => navigate('/profile')} 
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}
        >
          👤 我的
        </button>
      </div>
    </div>
  );
}