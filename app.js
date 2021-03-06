// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "Green-Tower";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

// SET UP SESSION
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // in milliseconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/Green-Tower",
      ttl: 24 * 60 * 60, // 1 day => in seconds
    }),
  })
);
// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

//start handling authorized routes
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const plantsRoutes = require("./routes/plants.routes");
app.use("/", plantsRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
