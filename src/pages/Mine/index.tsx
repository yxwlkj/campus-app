import { useNavigate } from 'react-router-dom';

export default function Mine() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#07c160', color: '#fff', padding: '20px 16px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 32 }}>👤</div>
        <div style={{ marginLeft: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>我的账号</div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>微信号: xxxx-1234</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 20, marginRight: 12 }}>💳</span>
          <span style={{ fontSize: 16 }}>服务</span>
        </div>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 20, marginRight: 12 }}>⚙️</span>
          <span style={{ fontSize: 16 }}>设置</span>
        </div>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 20, marginRight: 12 }}>❓</span>
          <span style={{ fontSize: 16 }}>帮助与反馈</span>
        </div>
      </div>
      <div style={{ background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#07c160' }}>👤 我的</button>
      </div>
    </div>
  );
}