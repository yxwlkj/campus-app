import { useNavigate } from 'react-router-dom';

export default function Discover() {
  const navigate = useNavigate();

  const items = [
    { icon: '📸', name: '朋友圈' },
    { icon: '🎮', name: '游戏' },
    { icon: '📰', name: '看一看' },
    { icon: '🎬', name: '直播' },
    { icon: '🛍️', name: '购物' },
  ];

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>发现</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 20, marginRight: 12 }}>{item.icon}</span>
            <span style={{ fontSize: 16 }}>{item.name}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#07c160' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👤 我的</button>
      </div>
    </div>
  );
}