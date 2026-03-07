import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  // 功能菜单
  const menus = [
    { id: 1, name: '新的朋友', icon: '➕', desc: '' },
    { id: 2, name: '群聊', icon: '👥', desc: '' },
    { id: 3, name: '标签', icon: '🏷️', desc: '' },
    { id: 4, name: '公众号', icon: '🔔', desc: '' },
  ];

  // 常用联系人
  const frequent = [
    { id: 1, name: '张三', avatar: '👦', note: '室友' },
    { id: 2, name: '李四', avatar: '👧', note: '同学' },
  ];

  // 好友列表
  const friends = [
    { id: 3, name: '王五', avatar: '👨', note: '班长' },
    { id: 4, name: '赵六', avatar: '👩', note: '学习委员' },
    { id: 5, name: '孙七', avatar: '🧑', note: '舍友' },
  ];

  // TabBar 切换
  const switchTab = (path: string) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <div className="nav-bar nav-contact">
        <div className="nav-title">通讯录</div>
        <div className="nav-icon">➕</div>
      </div>

      {/* 内容区域 */}
      <div className="content">
        {/* 搜索框 */}
        <div className="contact-search">
          <input type="text" className="search-input" placeholder="搜索" />
        </div>

        {/* 功能菜单 */}
        <div className="contact-list">
          {menus.map(menu => (
            <div key={menu.id} className="list-item">
              <div className="list-avatar">{menu.icon}</div>
              <div className="list-info">
                <div className="list-title">{menu.name}</div>
                <div className="list-desc">{menu.desc}</div>
              </div>
              <div className="func-arrow">→</div>
            </div>
          ))}
        </div>

        {/* 常用联系人 */}
        <div style={{ padding: '8px 15px', fontSize: '13px', color: '#999', background: '#f5f5f5' }}>
          常用联系人
        </div>
        <div className="contact-list">
          {frequent.map(item => (
            <div key={item.id} className="list-item">
              <div className="list-avatar">{item.avatar}</div>
              <div className="list-info">
                <div className="list-title">{item.name}</div>
                <div className="list-desc">{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 好友列表 */}
        <div style={{ padding: '8px 15px', fontSize: '13px', color: '#999', background: '#f5f5f5' }}>
          好友
        </div>
        <div className="contact-list">
          {friends.map(item => (
            <div key={item.id} className="list-item">
              <div className="list-avatar">{item.avatar}</div>
              <div className="list-info">
                <div className="list-title">{item.name}</div>
                <div className="list-desc">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 TabBar */}
      <div className="tab-bar">
        <div className="tab-bar-item" onClick={() => switchTab('/chat')}>
          <span className="tab-bar-icon">💬</span>
          <span>微信</span>
        </div>
        <div className="tab-bar-item active" onClick={() => switchTab('/contact')}>
          <span className="tab-bar-icon">👥</span>
          <span>通讯录</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/errands')}>
          <span className="tab-bar-icon">🚴</span>
          <span>跑腿</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/discover')}>
          <span className="tab-bar-icon">🔍</span>
          <span>发现</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/mine')}>
          <span className="tab-bar-icon">👤</span>
          <span>我</span>
        </div>
      </div>
    </div>
  );
}