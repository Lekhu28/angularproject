const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const drRoutes = require('./routes/drRoute');
const medicineRoutes = require('./routes/medicineRoute');
const queryRoutes = require('./routes/queryRoute');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/dr', drRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/queries', queryRoutes);

app.get('/', (req, res) => {
  res.send('Clinical Automation API Run');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
