// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
const app = express();
import router from './Router/auth-router.js'
import connectDB from './utils/db.js';
import cookie from 'cookie-parser'
dotenv.config();
app.use(express.json());
app.use(cors({
  origin : ["http://localhost:5173","http://localhost:5174","http://localhost:5175"],
  methods : ["GET","POST"],
  credentials:true
}));
app.use(cookie());
app.use("/api/auth",router)

app.post('/',(req,res)=>{
  res.status(200).json({message:req.body})
  console.log(req.body);
})

app.post('/dash',(req,res)=>{
  res.status(200).send("Aircraft SOS Dashboard")
  res.json("All set")
  })

// Start the server
connectDB().then(()=>{
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
