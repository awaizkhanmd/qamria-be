const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const reservationRoutes = require('./routes/reservation.Routes');
const userRoutes = require('./routes/user.Routes');
const os = require('os'); // Import os module
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Use the defined routes
app.use('/api', reservationRoutes);
app.use('/api', userRoutes);

// Function to get the local network IP address
function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Start the server
app.listen(PORT, () => {
  const networkIP = getNetworkIP();
  console.log(`Server running locally on http://localhost:${PORT}`);
  console.log(`Server accessible on http://${networkIP}:${PORT}`);
});
