import { getTime } from 'date-fns'
import { db } from './db.js'

export const getUserById = (userId) => {
    const query = db.prepare('SELECT * FROM users WHERE id = ?')
    return query.get(userId)
}

export const getAllUsers = () => {
    const query = db.prepare('SELECT * FROM users')
    return query.all()
}

export const getUserByUUID = (uuid) => {
    const query = db.prepare('SELECT * FROM users WHERE uuid = ?')
    return query.get(uuid)
}

export const registerUser = (uuid) => {
    const timestamp = getTime(Date.now())
    const query = db.prepare('INSERT INTO users (uuid, createdAt, lastLogin) VALUES (?, ?, ?)')
    return query.run(uuid, timestamp, timestamp)
}

export const updateUserProfile = (uuid, displayName, color, team, updateDate = 0, teamupdateDate = 0) => {
    const query = db.prepare('UPDATE users SET displayName = ?, profileColor = ?, team = ?, nameUpdateDate = ?, teamUpdateDate = ? WHERE uuid = ?')
    return query.run(displayName, color, team, updateDate, teamupdateDate, uuid)
}

export const updateUserLogin = (uuid) => {
    const query = db.prepare('UPDATE users SET lastLogin = ? WHERE uuid = ?')
    return query.run(getTime(Date.now()), uuid)
}

export const resetUserNameChange = (uuid) => {
    const query = db.prepare('UPDATE users SET nameUpdateDate = 0 WHERE uuid = ?')
    return query.run(uuid)
}

export const resetUserTeamChange = (uuid) => {
    const query = db.prepare('UPDATE users SET teamUpdateDate = 0 WHERE uuid = ?')
    return query.run(uuid)
}
