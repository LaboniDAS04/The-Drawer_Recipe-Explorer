const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const recipeRoutes=require('./routes/recipeRoutes');
const authRoutes=require('./routes/authRoutes');
const errorMiddleware=require('./middleware/errorMiddleware');

app.use('/api/auth',authRoutes);
app.use('/api',recipeRoutes);
app.use(errorMiddleware);

const connectDb = require("./config/db");
connectDb().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
