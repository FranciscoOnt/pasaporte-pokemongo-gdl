import express from 'express'
import Passport from 'passport'
import GoogleStrategy from 'passport-google-oidc';
import { v4 as uuidV4 } from 'uuid'
import { getAccount, registerAccount, getUserById, getUserByUUID, registerUser } from './db.js'

const verifyLogin = (issuer, profile, callback) => {
    const account = getAccount(issuer, profile.id);

    // Generate an account if user does not have one
    if (!account) {
        const signupResult = registerUser(profile.displayName, uuidV4())
        if (signupResult.changes === 0) {
            return callback(new Error("Could not generate user."))
        }

        const insertedRowId = signupResult.lastInsertRowid
        const registeredUser = getUserById(insertedRowId)
        const registeredAccount = registerAccount(registeredUser.uuid, issuer, profile.id)

        if (registeredAccount.changes === 0) {
            return callback(new Error("Could not generate account."))
        }

        return callback(null, registeredUser)
    }

    const loggedUser = getUserByUUID(account.user_id)

    return callback(null, loggedUser)
};

Passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
}, verifyLogin));

Passport.serializeUser(function (user, cb) {
    cb(null, { id: user.uuid, username: user.username, displayName: user.displayName, isAdmin: true });
});

Passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});


var router = express.Router();

router.get('/login', Passport.authenticate('google'));

router.get('/oauth2/redirect/google', Passport.authenticate('google', {
    successReturnToOrRedirect: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/`,
    failureRedirect: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/`
}));

router.post('/logout', function (req, res, next) {
    console.log("Logging Out")
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect(`${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/`);
        console.log("Redirecting")
    });
});

export { router as authRouter };
