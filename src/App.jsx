import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookingPage from './BookingPage';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://rental-app-backend-production.up.railway.app/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <header className="App-header">
      <h1>Red Light Rentals</h1>
      <p>{message}</p>
      <p>¡Tu backend de FastAPI está funcionando!</p>
      <Link to="/book" className="App-link">Hacer una Reserva</Link>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
