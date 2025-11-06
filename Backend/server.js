require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:8080",
  "https://slotswapper-project.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const connectToDb = require('./database/db.js')

// Routes
const authRoutes = require('./routes/auth-routes.js')
const eventRoutes = require("./routes/event-routes");
const swapRoutes = require("./routes/swap-routes");

// database
connectToDb();
app.use('/api/auth',authRoutes)
app.use("/api/events", eventRoutes);
app.use("/api/swaps", swapRoutes);

app.listen(PORT,() => {
    console.log(`server is lisiting at ${PORT}`)
})