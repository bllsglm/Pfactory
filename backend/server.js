import path from 'path';
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler } from "./middleware/errorMiddleware.js";


connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads' , express.static(path.join(__dirname, '/uploads')));

//Serve frontend
if(process.env.NODE_ENV ===  'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}else{
   app.get('/', (req,res) => {
    res.send('API is running...')
  })
}

app.use(errorHandler)

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
})



