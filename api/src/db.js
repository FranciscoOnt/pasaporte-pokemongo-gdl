import sqlite from 'better-sqlite3'

export const db = new sqlite('./db/pogo_gdl.db', { verbose: console.log })

db.pragma('journal_mode = WAL');
db.prepare("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT, \
    uuid TEXT UNIQUE, \
    displayName TEXT \
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

export const getUserById = (userId) => {
    const query = db.prepare('SELECT * FROM users WHERE id = ?')
    return query.get(userId)
}

export const getUserByUUID = (uuid) => {
    const query = db.prepare('SELECT * FROM users WHERE uuid = ?')
    return query.get(uuid)
}

export const registerUser = (userName, uuid) => {
    const query = db.prepare('INSERT INTO users (username, uuid) VALUES (?, ?)')
    return query.run(userName, uuid)
}

export const registerAccount = (user_id, provider, subject) => {
    const query = db.prepare('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)')
    return query.run(user_id, provider, subject)
}
