import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookingPage() {
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch available equipment from backend
    fetch('https://rental-app-backend-production.up.railway.app/equipment/')
      .then(response => response.json())
      .then(data => setEquipment(data))
      .catch(error => console.error('Error fetching equipment:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const newBooking = {
      equipment_id: parseInt(selectedEquipment),
      customer_name: customerName,
      customer_email: customerEmail,
      start_date: startDate,
      end_date: endDate,
    };

    fetch('https://rental-app-backend-production.up.railway.app/bookings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    })
      .then(response => response.json())
      .then(data => {
        if (data.detail) {
          setMessage(`Error: ${data.detail}`);
        } else {
          setMessage(`Reserva exitosa para ${data.customer_name} (${data.total_price} MXN)`);
          // Clear form
          setSelectedEquipment('');
          setCustomerName('');
          setCustomerEmail('');
          setStartDate('');
          setEndDate('');
        }
      })
      .catch(error => console.error('Error making booking:', error));
  };

  return (
    <div className="BookingPage">
      <header className="App-header">
        <h1>Hacer una Reserva</h1>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="equipment">Equipo:</label>
            <select
              id="equipment"
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              required
            >
              <option value="">Selecciona un equipo</option>
              {equipment.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} - ${item.price_per_day} MXN/día
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Tu Nombre:</label>
            <input
              type="text"
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Tu Email:</label>
            <input
              type="email"
              id="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Fecha de Inicio:</label>
            <input
              type="date"
              id="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">Fecha de Fin:</label>
            <input
              type="date"
              id="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reservar</button>
        </form>
        {message && <p className="message">{message}</p>}
        <Link to="/" className="App-link">Volver al Inicio</Link>
      </header>
    </div>
  );
}

export default BookingPage;
