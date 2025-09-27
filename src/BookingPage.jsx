import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Box, 
  Alert 
} from '@mui/material';

function BookingPage() {
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'success', 'error', 'info'

  useEffect(() => {
    // Fetch available equipment from backend
    fetch('https://rental-app-backend-production.up.railway.app/equipment/')
      .then(response => response.json())
      .then(data => setEquipment(data))
      .catch(error => {
        console.error('Error fetching equipment:', error);
        setMessage('Error al cargar equipos. Intenta de nuevo más tarde.');
        setMessageType('error');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('info');

    const newBooking = {
      equipment_id: parseInt(selectedEquipment),
      customer_name: customerName,
      customer_email: customerEmail,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await fetch('https://rental-app-backend-production.up.railway.app/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`Reserva exitosa para ${data.customer_name} (${data.total_price} MXN)`);
        setMessageType('success');
        // Clear form
        setSelectedEquipment('');
        setCustomerName('');
        setCustomerEmail('');
        setStartDate('');
        setEndDate('');
      } else {
        setMessage(`Error: ${data.detail || 'No se pudo completar la reserva.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error making booking:', error);
      setMessage('Error de conexión al intentar reservar. Intenta de nuevo.');
      setMessageType('error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hacer una Reserva
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="equipment-select-label">Equipo</InputLabel>
            <Select
              labelId="equipment-select-label"
              id="equipment-select"
              value={selectedEquipment}
              label="Equipo"
              onChange={(e) => setSelectedEquipment(e.target.value)}
            >
              <MenuItem value="">Selecciona un equipo</MenuItem>
              {equipment.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name} - ${item.price_per_day} MXN/día
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Tu Nombre"
            variant="outlined"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <TextField
            label="Tu Email"
            variant="outlined"
            fullWidth
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
          <TextField
            label="Fecha de Inicio"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <TextField
            label="Fecha de Fin"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Reservar
          </Button>
        </Box>
        {message && <Alert severity={messageType} sx={{ mt: 3 }}>{message}</Alert>}
        <Button component={RouterLink} to="/" sx={{ mt: 3 }}>
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
}

export default BookingPage;
