const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);

app.get('/', (req, res) => {
  res.json({ message: 'University Resources API' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/filieres', require('./routes/filiereRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
