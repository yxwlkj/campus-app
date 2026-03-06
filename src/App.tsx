// 明确导入React核心依赖，避免类型报错
import React, { useState } from 'react';
// 导入路由相关组件，并指定类型
import { HashRouter, Routes, Route } from 'react-router-dom';
// 导入antd-mobile组件，确保依赖识别
import { TabBar } from 'antd-mobile';
// 导入全局样式
import './App.css';

// 导入各功能页面（路径严格匹配src/pages目录）
import Chat from './pages/Chat';
import Moments from './pages/Moments';
import Nearby from './pages/Nearby';
import Errands from './pages/Errands';
import Mine from './pages/Mine';

// 定义底部导航项的类型，避免TS类型报错
interface TabItem {
  key: string;
  title: string;
  icon: string;
}

// 底部导航配置（仿微信样式）
const tabs: TabItem[] = [
  { key: 'chat', title: '聊天', icon: 'chat-o' },
  { key: 'moments', title: '朋友圈', icon: 'friends-o' },
  { key: 'nearby', title: '附近人', icon: 'location-o' },
  { key: 'errands', title: '跑腿', icon: 'shop-o' },
  { key: 'mine', title: '我的', icon: 'user-o' },
];

// 主应用组件（React.FC规范写法）
const App: React.FC = () => {
  // 定义底部导航激活状态，指定string类型
  const [activeKey, setActiveKey] = useState<string>('chat');
  // 定义聊天未读数，指定number类型
  const [noticeCount, setNoticeCount] = useState<number>(2);

  // Tab切换事件，明确参数类型
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // 点击聊天Tab时清空未读消息数，解决setNoticeCount未使用的警告
    if (key === 'chat') {
      setNoticeCount(0);
    }
  };

  return (
    <HashRouter>
      {/* 根容器，确保高度100% */}
      <div className="app-container">
        {/* 页面内容区，占满剩余高度 */}
        <div className="page-content">
          {/* 路由配置，严格闭合标签 */}
          <Routes>
            {/* 默认页面跳转到聊天页 */}
            <Route path="/" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/moments" element={<Moments />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/errands" element={<Errands />} />
            <Route path="/mine" element={<Mine />} />
          </Routes>
        </div>

        {/* 底部Tab导航栏，修复类型和事件绑定 */}
        <TabBar 
          activeKey={activeKey} 
          onChange={handleTabChange}
          className="tab-bar"
        >
          {tabs.map((tab) => (
            <TabBar.Item 
              key={tab.key} 
              icon={tab.icon} 
              title={tab.title} 
              badge={tab.key === 'chat' ? noticeCount : undefined}
            />
          ))}
        </TabBar>
      </div>
    </HashRouter>
  );
};

// 导出组件，符合ES6规范
export default App;