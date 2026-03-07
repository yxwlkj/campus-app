import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import Errands from './pages/Errands';
import Discover from './pages/Discover';
import Mine from './pages/Mine';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/errands" element={<Errands />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/mine" element={<Mine />} />
      </Routes>
    </Router>
  );
};

export default App;