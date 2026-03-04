const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const envOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  "https://homelyhubfrontend.netlify.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const allowedOrigins = [
  ...defaultOrigins,
  ...envOrigins,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/rent/listing", propertyRoutes);
app.use("/api/v1/rent/user", userRoutes);

module.exports = app;
