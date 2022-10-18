import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 8080;
const app = express();

//Middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api', allRoutes);

//Error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Internal server error';

  return res.status(status).json({ message, stack: err.stack });
})

//Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
