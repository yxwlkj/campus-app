import { useNavigate } from 'react-router-dom';

const contactList = [
  { id: 1, name: '张三', avatar: '👨‍💼', letter: 'Z' },
  { id: 2, name: '李四', avatar: '👩‍💻', letter: 'L' },
  { id: 3, name: '王五', avatar: '👨‍🎓', letter: 'W' },
];

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>通讯录</div>
        <button onClick={() => navigate('/addfriend')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>➕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 16, fontWeight: '500' }}>新的朋友</div>
        </div>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 16, fontWeight: '500' }}>群聊</div>
        </div>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 16, fontWeight: '500' }}>标签</div>
        </div>
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 16, fontWeight: '500' }}>公众号</div>
        </div>
        <div style={{ marginTop: 16, background: '#fff', padding: '8px 16px', fontSize: 14, color: '#666' }}>Z</div>
        {contactList.map(c => (
          <div key={c.id} style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>{c.avatar}</div>
            <div style={{ fontSize: 16 }}>{c.name}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#07c160' }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👤 我的</button>
      </div>
    </div>
  );
}