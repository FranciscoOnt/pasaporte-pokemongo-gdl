import axios from "axios";
import { API_URL } from "./constants";

const api = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  withCredentials: true,
});

export async function getUserProfile() {
  return (await api.get("/profile")).data;
}

export async function updateUserProfile(data) {
  return await api.post("/profile/update", data);
}

export async function getUsers() {
  return (await api.get("/admin/users", { withCredentials: true })).data;
}

export async function getUserData(userId) {
  return (await api.get(`/admin/users/${userId}`)).data;
}

export async function resetUserNameCooldown(userId) {
  return await api.post(`/admin/users/${userId}/reset-name`);
}

export async function resetUserTeamCooldown(userId) {
  return await api.post(`/admin/users/${userId}/reset-team`);
}

export async function userFill() {
  return (await api.get(`/admin/users/fill`)).data;
}

export async function getSites() {
  return (await api.get("/admin/sites", { withCredentials: true })).data;
}

export async function getSiteData(userId) {
  return (await api.get(`/admin/sites/${userId}`)).data;
}
