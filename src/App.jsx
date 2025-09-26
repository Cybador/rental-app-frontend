import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://rental-app-backend-production.up.railway.app/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend de la Aplicación de Renta</h1>
        <p>{message}</p>
        <p>¡Tu backend de FastAPI está funcionando!</p>
      </header>
    </div>
  );
}

export default App;