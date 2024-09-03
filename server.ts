import express from 'express';
import cors from 'cors';
import appRoutes from './src/routes';
import dotenv from 'dotenv';
import { customError } from './src/utils/respose';
import connectDB from './src/db';

dotenv.config();

const app = express();


// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

app.use(customError);
app.use(appRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
