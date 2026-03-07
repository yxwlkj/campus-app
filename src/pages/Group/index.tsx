import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const friendList = [
  { id: 1, name: '张三', avatar: '👨‍💼', checked: false },
  { id: 2, name: '李四', avatar: '👩‍💻', checked: false },
  { id: 3, name: '王五', avatar: '👨‍🎓', checked: false },
];

export default function Group() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState(friendList);
  const [groupName, setGroupName] = useState('');

  const toggleCheck = (id: number) => {
    setFriends(friends.map(f => f.id === id ? { ...f, checked: !f.checked } : f));
  };

  const createGroup = () => {
    const selected = friends.filter(f => f.checked);
    if (selected.length === 0) return alert('请至少选择一位好友');
    const name = groupName || selected.map(f => f.name).join('、');
    alert(`创建群聊：${name}`);
    navigate('/chatlist');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>发起群聊</div>
        <button onClick={createGroup} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', fontSize: 16 }}>完成</button>
      </div>
      <div style={{ padding: 16 }}>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="输入群聊名称（可选）"
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}
        />
        <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>选择好友（可多选）</div>
        {friends.map(f => (
          <div key={f.id} onClick={() => toggleCheck(f.id)} style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ width: 20, height: 20, border: `1px solid ${f.checked ? '#07c160' : '#ddd'}`, borderRadius: '50%', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {f.checked && <span style={{ fontSize: 12, color: '#07c160' }}>✔</span>}
            </div>
            <span style={{ fontSize: 16 }}>{f.avatar} {f.name}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', padding: '16px' }}>
        <button onClick={createGroup} style={{ width: '100%', padding: '12px', background: '#07c160', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16 }}>
          创建群聊
        </button>
      </div>
    </div>
  );
}