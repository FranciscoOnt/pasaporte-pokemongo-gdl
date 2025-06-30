import express from 'express'
import { getUserByUUID, updateUserProfile } from './db/user-db.js'
import { addDays, getTime, isBefore } from "date-fns";

var router = express.Router();

router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        const profile = getUserByUUID(req.session.passport.user.id)
        return res.send({ ...profile, isAdmin: true })
    }

    res.send({})
})

router.post('/profile/update', (req, res) => {
    if (req.isAuthenticated()) {
        const errors = []
        const uuid = req.session.passport.user.id;
        const user = getUserByUUID(uuid);
        let { displayName, profileColor, team } = req.body
        let nameChangeDate = new Date(user.nameUpdateDate)
        let teamChangeDate = new Date(user.teamUpdateDate)

        if (displayName === user.displayName && profileColor === user.profileColor && team === user.team) {
            return res.status(200).send()
        }

        if (displayName !== user.displayName) {
            if (isBefore(Date.now(), addDays(nameChangeDate, 30))) {
                errors.push({ message: "El nombre de entrenador fue actualizado recientemente, es necesario esperar al menos 30 dias despues de la fecha del ultimo cambio" })
                displayName = user.displayName;
            } else {
                nameChangeDate = Date.now();
            }
        }

        if (team !== user.team) {
            if (isBefore(Date.now(), addDays(teamChangeDate, 30))) {
                errors.push({ message: "El equipo fue actualizado recientemente, es necesario esperar al menos 30 dias despues de la fecha del ultimo cambio" })
                team = user.team;
            } else {
                teamChangeDate = Date.now();
            }
        }

        updateUserProfile(uuid, displayName, profileColor, team, getTime(nameChangeDate), getTime(teamChangeDate))

        return res.status(200).send(errors)
    }

    res.status(401).send()
})

export { router as profileRouter };
