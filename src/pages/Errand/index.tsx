import { useNavigate } from 'react-router-dom';

export default function Errand() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部导航 */}
      <div style={{ 
        background: '#07c160', 
        color: '#fff', 
        padding: '12px 16px', 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>跑腿服务</div>
      </div>

      {/* 跑腿功能内容 */}
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 20 }}>🚗</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>跑腿服务</div>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 30, textAlign: 'center' }}>
          帮买、帮送、帮取<br/>
          足不出户，轻松办事
        </div>
        <button 
          onClick={() => alert('跑腿下单功能开发中~')}
          style={{ 
            padding: '12px 40px', 
            background: '#07c160', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 20,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          立即下单
        </button>
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
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}
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
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#07c160' }}
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