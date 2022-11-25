import api from "@/api/request.js";

export function getSiteData() {
  return api.get("/services/coreapi/sites/tree");
}

export function getRoleData() {
  return api.get("/services/uaa/api/v2/groups?no_page=true");
}
