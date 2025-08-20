import express from "express";
import _ from "lodash";
import {
  getAllUsers,
  getUserByUUID,
  registerUser,
  resetUserNameChange,
  resetUserTeamChange,
} from "./user-db.js";
import { v4 } from "uuid";
import validateAdmin from "../validate-admin.js";

var router = express.Router();

router.use(validateAdmin);

router.get("/admin/users", async (_req, res) => {
  const users = await getAllUsers();

  res.send(users.map((user) => _.omit(user, ["id", "isAdmin"])));
});

router.get("/admin/users/fill", async (_req, res) => {
  await registerUser(v4());

  return res.status(200).send();
});

router.get("/admin/users/:userId", async (req, res) => {
  const profile = await getUserByUUID(req.params.userId);

  return res.send(_.omit(profile, ["id", "isAdmin"]));
});

router.post("/admin/users/:userId/reset-name", async (req, res) => {
  const response = await resetUserNameChange(req.params.userId);

  if (response > 0) {
    return res.status(200).send();
  }

  return res.status(404).send();
});

router.post("/admin/users/:userId/reset-team", async (req, res) => {
  const response = await resetUserTeamChange(req.params.userId);

  if (response > 0) {
    return res.status(200).send();
  }

  return res.status(404).send();
});

export { router as userAdminRouter };
