import api from "@/api/request.js";

export function login(params) {
  return api.post("/services/uaa/api/v2/auth/login", params);
}

export function logout() {
  return api.post("/services/uaa/api/v2/auth/logout");
}
