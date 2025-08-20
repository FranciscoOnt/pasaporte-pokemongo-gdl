import { getTime } from "date-fns";
import { db } from "../../db.js";

export const getUserById = async (userId) => {
  return await db("users").where("id", userId).first();
};

export const getAllUsers = async () => {
  return await db("users");
};

export const getUserByUUID = async (uuid) => {
  return await db("users").where("uuid", uuid).first();
};

export const registerUser = async (uuid) => {
  const timestamp = getTime(Date.now());

  return await db("users").insert(
    {
      uuid,
      createdAt: timestamp,
      lastLogin: timestamp,
    },
    ["id"],
  );
};

export const updateUser = async (userData) => {
  const { uuid, ...user } = userData;
  return await db("users").where("uuid", uuid).update(user);
};

export const updateUserLogin = async (uuid) => {
  return await db("users").where("uuid", uuid).update({
    lastLogin: Date.now(),
  });
};

export const resetUserNameChange = async (uuid) => {
  return await db("users").where("uuid", uuid).update({
    nameUpdateDate: 0,
  });
};

export const resetUserTeamChange = async (uuid) => {
  return await db("users").where("uuid", uuid).update({
    teamUpdateDate: 0,
  });
};
