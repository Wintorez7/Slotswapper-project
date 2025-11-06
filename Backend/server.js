require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://slotswapper-project.vercel.app",
  "https://slotswapper-project-i0lnyzg43-mohan-kumhars-projects.vercel.app", // ✅ Vercel preview domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// database + routes
const connectToDb = require('./database/db.js');
const authRoutes = require('./routes/auth-routes.js');
const eventRoutes = require("./routes/event-routes");
const swapRoutes = require("./routes/swap-routes");

connectToDb();

app.use('/api/auth', authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/swaps", swapRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
