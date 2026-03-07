import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import Errand from './pages/Errand';

// 占位页面
const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
    <div style={{ fontSize: 20, color: '#666' }}>{title} 页面开发中</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatList />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/errand" element={<Errand />} />
        <Route path="/group" element={<PlaceholderPage title="发起群聊" />} />
        <Route path="/addfriend" element={<PlaceholderPage title="添加朋友" />} />
        <Route path="/scan" element={<PlaceholderPage title="扫一扫" />} />
        <Route path="/pay" element={<PlaceholderPage title="收付款" />} />
        <Route path="/contacts" element={<PlaceholderPage title="通讯录" />} />
        <Route path="/discover" element={<PlaceholderPage title="发现" />} />
        <Route path="/profile" element={<PlaceholderPage title="我的" />} />
      </Routes>
    </Router>
  );
}

export default App;