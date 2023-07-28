require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const driverRoutes = require("./routes/driverRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const checkUserRights = require("./middleware/checkUserRights");
const { connectDB, closeDB } = require("./middleware/connectToDB");

// Connect to the database at the start
connectDB();

const app = express();

// MiddleWares
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "votre_secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoURI }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true // Add this to enable CORS with credentials (e.g., cookies)
}));

// Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/driver", driverRoutes);
app.use("/vendor", vendorRoutes);

// Middleware pour gérer les routes non trouvées.
app.use((req, res, next) => {
  res.status(404).send('Page non trouvée');
});

// Middleware pour gérer les erreurs internes du serveur.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose a mal tourné !');
});

const port = process.env.PORT || 3000;

// Server start
app.listen(port, () =>
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`)
);

// Graceful shutdown
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
