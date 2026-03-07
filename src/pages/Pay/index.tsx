import { useNavigate } from 'react-router-dom';

export default function Pay() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>收付款</div>
      </div>
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: 8, width: '100%', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', marginBottom: 12 }}>付款码</div>
          <div style={{ width: '100%', height: 150, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📷</div>
          <div style={{ fontSize: 12, color: '#999', textAlign: 'center', marginTop: 8 }}>向商家付款时出示</div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: 8, width: '100%' }}>
          <div style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', marginBottom: 12 }}>收款码</div>
          <div style={{ width: '100%', height: 150, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>💰</div>
          <div style={{ fontSize: 12, color: '#999', textAlign: 'center', marginTop: 8 }}>向朋友收款时出示</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👤 我的</button>
      </div>
    </div>
  );
}