import { db } from "../db.js";

export const getAccount = async (issuer, profileId) => {
  return await db("federated_credentials")
    .where("provider", issuer)
    .where("subject", profileId)
    .first();
};

export const registerAccount = async (user_id, provider, subject) => {
  return await db("federated_credentials").insert({
    user_id,
    provider,
    subject,
  });
};
