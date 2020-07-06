require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const db = require("./middleware/db");

const indexRouter = require("./routes/index");
const groupsRouter = require("./routes/groups");
const levelsRouter = require("./routes/levels");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(db);

app.use("/", indexRouter);
app.use("/groups", groupsRouter);
app.use("/levels", levelsRouter);


app.use(require("./errors/conflict"));
app.use(require("./errors/default"));

module.exports = app;
