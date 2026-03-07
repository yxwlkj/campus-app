import { useNavigate } from 'react-router-dom';

export default function Discover() {
  const navigate = useNavigate();

  // 功能列表
  const features = [
    { id: 1, name: '朋友圈', icon: '📸' },
    { id: 2, name: '视频号', icon: '🎬' },
    { id: 3, name: '小程序', icon: '🔧' },
    { id: 4, name: '游戏', icon: '🎮' },
    { id: 5, name: '直播', icon: '📺' },
    { id: 6, name: '购物', icon: '🛒' },
    { id: 7, name: '扫一扫', icon: '📷' },
    { id: 8, name: '摇一摇', icon: '🔄' },
  ];

  // TabBar 切换
  const switchTab = (path: string) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <div className="nav-bar nav-discover">
        <div className="nav-title">发现</div>
        <div className="nav-icon">⚙️</div>
      </div>

      {/* 内容区域 */}
      <div className="content">
        <div className="card">
          {features.map(item => (
            <div key={item.id} className="func-item">
              <div className="func-icon">{item.icon}</div>
              <div className="func-title">{item.name}</div>
              <div className="func-arrow">→</div>
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
        <div className="tab-bar-item" onClick={() => switchTab('/contact')}>
          <span className="tab-bar-icon">👥</span>
          <span>通讯录</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/errands')}>
          <span className="tab-bar-icon">🚴</span>
          <span>跑腿</span>
        </div>
        <div className="tab-bar-item active" onClick={() => switchTab('/discover')}>
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