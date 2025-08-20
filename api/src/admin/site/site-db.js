import { db } from "../../db.js";

export const getSites = async () => {
  return await db("sites");
};

export const createSite = async (siteData) => {
  return await db("sites").insert({ siteData }, ["id"]);
};

export const updateSite = async (siteData) => {
  const { uuid, ...site } = siteData;

  return await db("sites").where("uuid", uuid).update({
    site,
  });
};
