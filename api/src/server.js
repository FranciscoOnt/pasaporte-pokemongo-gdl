import express from "express";
import sqlite from "better-sqlite3";
import morgan from "morgan";
import session from "express-session";
import SQLiteStore from "better-sqlite3-session-store";
import { authRouter } from "./user/auth.js";
import { profileRouter } from "./user/profile/profile-router.js";
import { userAdminRouter } from "./admin/user/user-router.js";
import Passport from "passport";
import cors from "cors";

const _SQLiteStore = SQLiteStore(session);

const db = new sqlite("./db/sessions.db");

const app = express();

const corsConfig = {
  origin: /http:\/\/localhost:\d+/,
  credentials: true,
};

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors(corsConfig));
app.use(
  session({
    name: "pokemongo_gdl",
    store: new _SQLiteStore({
      client: db,
      expired: {
        clear: true,
        intervalMs: 900000, //ms = 15min
      },
    }),
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false,
  }),
);
app.use(Passport.initialize());
app.use(Passport.authenticate("session"));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userAdminRouter);

const port = process.env.API_PORT ?? "";

app.listen(port, () => console.log(`Server is listening at port ${port}...`));
