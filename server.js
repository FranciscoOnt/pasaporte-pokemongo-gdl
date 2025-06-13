import express from 'express'
import sqlite from 'better-sqlite3'
import session from 'express-session'
import SQLiteStore from 'better-sqlite3-session-store'
import { authRouter } from './src/api/auth.js'
import ViteExpress from "vite-express";
import Passport from 'passport'

const _SQLiteStore = SQLiteStore(session);

const db = new sqlite("sessions.db");

const app = express();

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

const port = 3000

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

ViteExpress.listen(app, port, () => console.log("Server is listening..."));
