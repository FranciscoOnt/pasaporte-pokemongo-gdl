import express from 'express'
import { getAllUsers, getUserByUUID, registerUser, resetUserNameChange, resetUserTeamChange } from '../db/user-db.js'
import { v4 } from 'uuid';

var router = express.Router();

const validateAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.isAdmin) {
        return next();
    }

    return res.status(401).send()
}

router.use(validateAdmin)

router.get('/admin/users', (req, res) => {
    const users = getAllUsers();

    const response = users.map((user) => {
        // filter unwanted public fields
        const { id, isAdmin, ...rest } = user
        return { ...rest }
    })

    res.send(response)
})

router.get('/admin/users/fill', (req, res) => {
    const uuid = v4()
    registerUser(uuid)

    return res.status(200).send()
})

router.get('/admin/users/:userId', (req, res) => {
    let { userId } = req.params
    const profile = getUserByUUID(userId)

    // filter unwanted public fields
    const { id, isAdmin, ...rest } = profile

    return res.send(rest)
})


router.post('/admin/users/:userId/reset-name', (req, res) => {
    const { userId } = req.params
    const response = resetUserNameChange(userId);

    if (response.changes > 0) {
        return res.status(200).send()
    }

    return res.status(404).send()
})

router.post('/admin/users/:userId/reset-team', (req, res) => {
    const { userId } = req.params
    const response = resetUserTeamChange(userId);

    if (response.changes > 0) {
        return res.status(200).send()
    }

    return res.status(404).send()
})

export { router as userAdminRouter };
