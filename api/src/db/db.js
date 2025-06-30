import sqlite from 'better-sqlite3'
import { getTime } from 'date-fns';

export const db = new sqlite('./db/pogo_gdl.db', { verbose: console.log })

db.pragma('journal_mode = WAL');
db.prepare("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    uuid TEXT UNIQUE, \
    displayName TEXT, \
    team TEXT DEFAULT 'none', \
    profileColor INTEGER DEFAULT 0, \
    nameUpdateDate INTEGER DEFAULT 0, \
    teamUpdateDate INTEGER DEFAULT 0, \
    lastLogin INTEGER DEFAULT 0, \
    createdAt INTEGER DEFAULT 0, \
    suspended INTEGER DEFAULT 0 \
  )").run()

db.prepare("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )").run()

export const getAccount = (issuer, profileId) => {
    const query = db.prepare('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?')
    return query.get(issuer, profileId)
}

export const registerAccount = (user_id, provider, subject) => {
    const query = db.prepare('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)')
    return query.run(user_id, provider, subject)
}
