require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const landRoutes = require('./routes/landRoutes');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('Missing required environment variables. Please set MONGO_URI and JWT_SECRET in your .env file.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Land Due Diligence API is running');
});

app.use('/api', authRoutes);
app.use('/api', landRoutes);
app.use('/api', userRoutes);
app.use('/api', activityRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
