import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import BookingPage from './BookingPage';

// MUI Components
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://rental-app-backend-production.up.railway.app/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Red Light Rentals
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          {message}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          ¡Tu backend de FastAPI está funcionando!
        </Typography>
        <Button variant="contained" color="primary" component={RouterLink} to="/book" sx={{ mt: 3 }}>
          Hacer una Reserva
        </Button>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: '#FF0000' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Red Light Rentals
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/book">
            Reservar
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: '#FF0000', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/book" component={BookingPage} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
