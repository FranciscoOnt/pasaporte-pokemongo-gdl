import express from 'express'
import sqlite from 'better-sqlite3'
import session from 'express-session'
import SQLiteStore from 'better-sqlite3-session-store'
import { authRouter } from './auth.js'
import Passport from 'passport'
import cors from 'cors';

const _SQLiteStore = SQLiteStore(session);

const db = new sqlite("./db/sessions.db");

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig))
app.use(
    session({
        name: 'pokemongo_gdl',
        store: new _SQLiteStore({
            client: db,
            expired: {
                clear: true,
                intervalMs: 900000 //ms = 15min
            }
        }),
        secret: "keyboard cat",
        saveUninitialized: false,
        resave: false,
    })
)
app.use(Passport.initialize());
app.use(Passport.authenticate('session'));

app.use('/', authRouter);

const port = process.env.API_PORT ?? ""

app.get('/session', (req, res) => {
    console.log(req.session.passport.user)
    res.send(`Request => ${JSON.stringify(req.session.passport.user)}`)
})

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send(req.session.passport.user)
    }
    res.send({})
})

app.listen(port, () => console.log(`Server is listening at port ${port}...`));
