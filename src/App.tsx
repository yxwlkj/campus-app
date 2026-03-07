import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import Errand from './pages/Errand';
import Group from './pages/Group';
import AddFriend from './pages/AddFriend';
import Scan from './pages/Scan';
import Pay from './pages/Pay';
import Contact from './pages/Contact';
import Discover from './pages/Discover';
import Mine from './pages/Mine';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatList />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/errand" element={<Errand />} />
        <Route path="/group" element={<Group />} />
        <Route path="/addfriend" element={<AddFriend />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/profile" element={<Mine />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;