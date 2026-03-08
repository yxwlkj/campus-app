import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

// 导入你已完成的聊天页面（保持不变）
import ChatList from './pages/ChatList'; // 你的聊天首页
import ContactList from './pages/ContactList'; // 你的通讯录（如有）
import Discover from './pages/Discover'; // 你的发现页（如有）

// 导入新增的跑腿页面
import Profile from './pages/Profile';
import RunnerHome from './pages/RunnerHome';
import PublishOrder from './pages/PublishOrder';
import OrderList from './pages/OrderList';
import RunnerCenter from './pages/RunnerCenter';
import RunnerApply from './pages/RunnerApply';

// 路由容器（兼容你现有结构）
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 页面内容区（保留你现有聊天路由，新增跑腿路由） */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          {/* 你已完成的聊天相关路由（完全保留，不修改） */}
          <Route path="/" element={<ChatList />} />
          <Route path="/contact" element={<ContactList />} />
          <Route path="/discover" element={<Discover />} />

          {/* 新增跑腿专属路由（和聊天路由无冲突） */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/runner" element={<RunnerHome />} />
          <Route path="/runner/publish" element={<PublishOrder />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/runner/center" element={<RunnerCenter />} />
          <Route path="/runner/apply" element={<RunnerApply />} />
        </Routes>
      </div>

      {/* 底部Tab导航（新增“跑腿”Tab，不改动你现有Tab） */}
      <TabBar
        activeKey={location.pathname}
        onChange={(key) => navigate(key)}
        style={{ borderTop: '1px solid #eee' }}
      >
        <TabBar.Item key="/" icon={<span>💬</span>} title="聊天" />
        <TabBar.Item key="/contact" icon={<span>👥</span>} title="通讯录" />
        <TabBar.Item key="/runner" icon={<span>🚗</span>} title="跑腿" />
        <TabBar.Item key="/discover" icon={<span>🔍</span>} title="发现" />
        <TabBar.Item key="/profile" icon={<span>👤</span>} title="我的" />
      </TabBar>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;