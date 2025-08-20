import express from "express";
import Passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import { v4 as uuidV4 } from "uuid";
import { getAccount, registerAccount } from "./account-db.js";
import {
  getUserById,
  getUserByUUID,
  registerUser,
  updateUserLogin,
} from "../admin/user/user-db.js";

const verifyLogin = async (issuer, profile, callback) => {
  const account = await getAccount(issuer, profile.id);

  if (!account) {
    const signupResult = await registerUser(uuidV4());
    if (signupResult.changes === 0) {
      return callback(new Error("Could not generate user."));
    }

    const registeredUser = await getUserById(signupResult[0]?.id);
    const registeredAccount = await registerAccount(
      registeredUser.uuid,
      issuer,
      profile.id,
    );

    if (registeredAccount.changes === 0) {
      return callback(new Error("Could not generate account."));
    }

    return callback(null, registeredUser);
  }

  const loggedUser = await getUserByUUID(account.user_id);

  await updateUserLogin(loggedUser.uuid);

  return callback(null, loggedUser);
};

Passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    verifyLogin,
  ),
);

Passport.serializeUser(function (user, cb) {
  cb(null, {
    id: user.uuid,
    displayName: user.displayName,
    profileColor: user.profileColor ?? 0,
    nameUpdateDate: user.nameUpdateDate,
    isAdmin: true,
  });
});

Passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

var router = express.Router();

router.get("/login", Passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  Passport.authenticate("google", {
    successReturnToOrRedirect: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/`,
    failureRedirect: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/`,
  }),
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/`);
  });
});

export { router as authRouter };
