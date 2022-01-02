const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const expressSession = require("express-session");
const cors = require("cors");

const redis = require("ioredis");
const redisStore = require("connect-redis")(expressSession);

require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.redisHost,
  port: parseInt(process.env.redisPort),
  password: process.env.redisPass,
});

const accountRoutes = require("./Routes/accountRoutes");
const foodRoutes = require("./Routes/foodRoutes");

const app = express();

app.use(express.json());

app.use(
  expressSession({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: "userID",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    store: new redisStore({ client: redisClient }),
  })
);
app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/account", accountRoutes);
app.use("/food", foodRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
