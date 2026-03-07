import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFriend() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const searchFriend = () => {
    if (!search.trim()) return;
    alert(`搜索好友：${search}，功能开发中`);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>添加朋友</div>
      </div>
      <div style={{ padding: 16, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 20, padding: '8px 12px' }}>
          <span style={{ fontSize: 16, marginRight: 8 }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索手机号/微信号"
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }}
          />
        </div>
        <button onClick={searchFriend} style={{ width: '100%', marginTop: 16, padding: '12px', background: '#07c160', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16 }}>
          搜索
        </button>
      </div>
      <div style={{ flex: 1, padding: 16 }}>
        <div style={{ background: '#fff', padding: '12px', borderRadius: 8, marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: '500' }}>扫一扫加好友</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>扫描二维码添加朋友</div>
        </div>
        <div style={{ background: '#fff', padding: '12px', borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: '500' }}>面对面加好友</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>附近的人快速添加</div>
        </div>
      </div>
    </div>
  );
}