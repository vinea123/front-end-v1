import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logins from './auth/Logins';
import Layers  from './components/Layouts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logins />} />
        <Route path="/dashboard" element={<Layers/>} />
      </Routes>
    </Router>
  );
}

export default App;