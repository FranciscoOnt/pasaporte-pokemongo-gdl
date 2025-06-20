import sqlite from 'better-sqlite3'

export const db = new sqlite('./db/pogo_gdl.db', { verbose: console.log })

db.pragma('journal_mode = WAL');
db.prepare("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    uuid TEXT UNIQUE, \
    displayName TEXT, \
    profileColor INTEGER, \
    nameUpdateDate INTEGER DEFAULT 0, \
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

export const getUserById = (userId) => {
    const query = db.prepare('SELECT * FROM users WHERE id = ?')
    return query.get(userId)
}

export const getUserByUUID = (uuid) => {
    const query = db.prepare('SELECT * FROM users WHERE uuid = ?')
    return query.get(uuid)
}

export const registerUser = (uuid) => {
    const query = db.prepare('INSERT INTO users (uuid) VALUES (?)')
    return query.run(uuid)
}

export const registerAccount = (user_id, provider, subject) => {
    const query = db.prepare('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)')
    return query.run(user_id, provider, subject)
}

export const updateUserProfile = (uuid, displayName, color, updateDate = 0) => {
    const query = db.prepare('UPDATE users SET displayName = ?, profileColor = ?, nameUpdateDate = ? WHERE uuid = ?')
    return query.run(displayName, color, updateDate, uuid)
}
