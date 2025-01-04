const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let bookings = [
    // { id: 1, date: '2023-12-01', time: '18:00', guests: 2, name: 'John Doe', email: 'john@example.com', phone: '1234567890' }
];
console.log(bookings.length);
let currentId = 1;

// Routes
app.post('/api/bookings', (req, res) => {
    const newBooking = { id: currentId++, ...req.body };
    bookings.push(newBooking);
    console.log("curr"+currentId);
    res.status(201).json(newBooking);
});

app.get('/api/bookings/:id', (req, res) => {
    console.log("id"+req.params.id);
    const bookingId = parseInt(req.params.id, 10);
    const booking = bookings.find(booking => booking.id === bookingId); // Find single booking
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ message: 'Booking not found' }); // Handle not found case
    }
});


app.delete('/api/bookings/:id', (req, res) => {
    const bookingId = parseInt(req.params.id, 10);
    bookings = bookings.filter(booking => booking.id !== bookingId);
    res.status(204).send();
});

app.get('/api/bookings/:date', (req, res) => {
    const date = req.params.date;
    const dayBookings = bookings.filter(booking => booking.date === date);
    res.json(dayBookings.map(booking => booking.time));
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
