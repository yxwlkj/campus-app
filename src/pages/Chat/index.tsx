import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 模拟聊天列表数据
const chatList = [
  { id: 1, name: '张三', avatar: '👨‍💼' },
  { id: 2, name: '李四', avatar: '👩‍💻' },
  { id: 3, name: '王五', avatar: '👨‍🎓' },
];

// 模拟默认消息
const defaultMessages = [
  { id: 1, content: '你好！', sender: 'other', time: '10:00' },
  { id: 2, content: '嗨，最近怎么样？', sender: 'me', time: '10:01' },
];

export default function Chat() {
  const navigate = useNavigate();
  const [activeChat] = useState(chatList[0]);
  const [messages, setMessages] = useState(defaultMessages);
  const [inputMsg, setInputMsg] = useState('');
  // 控制顶部+号弹窗
  const [showTopMenu, setShowTopMenu] = useState(false);

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

  // 点击遮罩关闭弹窗
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.top-menu-container') && showTopMenu) {
        setShowTopMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTopMenu]);

  // 顶部+号功能
  const topMenuActions = {
    groupChat: () => {
      alert('发起群聊功能开发中~');
      setShowTopMenu(false);
    },
    addFriend: () => {
      alert('添加好友功能开发中~');
      setShowTopMenu(false);
    },
    scan: () => {
      alert('扫一扫功能开发中~');
      setShowTopMenu(false);
    },
    pay: () => {
      alert('收付款功能开发中~');
      setShowTopMenu(false);
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
      {/* 顶部导航栏（微信风格，带+号菜单） */}
      <div style={{ background: '#07c160', color: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>←</button>
        <span style={{ marginLeft: '12px', fontSize: '18px', fontWeight: 'bold' }}>{activeChat.name}</span>
        {/* 顶部右侧+号 */}
        <button
          onClick={() => setShowTopMenu(!showTopMenu)}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
        >
          +
        </button>

        {/* 👇 新增：顶部+号弹窗菜单（微信完整功能） */}
        {showTopMenu && (
          <div className="top-menu-container" style={{
            position: 'absolute',
            top: '100%',
            right: '16px',
            background: '#2e2e2e',
            borderRadius: '8px',
            width: '200px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}>
            {/* 发起群聊 */}
            <div
              onClick={topMenuActions.groupChat}
              style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #3a3a3a' }}
            >
              <span style={{ fontSize: '20px', marginRight: '12px' }}>👥</span>
              <span style={{ color: 'white', fontSize: '14px' }}>发起群聊</span>
            </div>
            {/* 添加朋友 */}
            <div
              onClick={topMenuActions.addFriend}
              style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #3a3a3a' }}
            >
              <span style={{ fontSize: '20px', marginRight: '12px' }}>➕</span>
              <span style={{ color: 'white', fontSize: '14px' }}>添加朋友</span>
            </div>
            {/* 扫一扫 */}
            <div
              onClick={topMenuActions.scan}
              style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #3a3a3a' }}
            >
              <span style={{ fontSize: '20px', marginRight: '12px' }}>📷</span>
              <span style={{ color: 'white', fontSize: '14px' }}>扫一扫</span>
            </div>
            {/* 收付款 */}
            <div
              onClick={topMenuActions.pay}
              style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '20px', marginRight: '12px' }}>💳</span>
              <span style={{ color: 'white', fontSize: '14px' }}>收付款</span>
            </div>
          </div>
        )}
      </div>

      {/* 消息列表区域 */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#f5f5f5' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
            {msg.sender === 'other' && <span style={{ fontSize: '24px', marginRight: '8px' }}>{activeChat.avatar}</span>}
            <div style={{ maxWidth: '70%', background: msg.sender === 'me' ? '#95ec69' : 'white', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{msg.content}</p>
              <span style={{ fontSize: '10px', color: '#999', display: 'block', textAlign: 'right', marginTop: '4px' }}>{msg.time}</span>
            </div>
            {msg.sender === 'me' && <span style={{ fontSize: '24px', marginLeft: '8px' }}>👤</span>}
          </div>
        ))}
      </div>

      {/* 输入框区域 */}
      <div style={{ padding: '8px 16px', background: 'white', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '20px', fontSize: '14px', outline: 'none' }}
        />
        <button onClick={sendMessage} style={{ marginLeft: '8px', padding: '8px 16px', background: '#07c160', color: 'white', border: 'none', borderRadius: '20px', fontSize: '14px', cursor: 'pointer' }}>发送</button>
      </div>

      {/* 底部导航（微信风格） */}
      <div style={{ background: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', color: '#07c160' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', color: '#666' }}>👥 通讯录</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', color: '#666' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', color: '#666' }}>👤 我的</button>
      </div>
    </div>
  );
}