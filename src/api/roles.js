import api from "@/api/request.js";
import { stringify } from "qs";

export async function getData(data) {
  const params = {
    ...data,
    o: "-updated_at",
    user_count: true,
  };
  const { results, count } = await api.get(
    `/services/uaa/api/v2/groups?${stringify(params)}`
  );
  const roleData = results.map((item) => ({
    id: item.id,
    name: item.name,
    note: item.note,
    userCount: item.user_count,
    modifier: item.last_modified_user ? item.last_modified_user.full_name : "",
    lastUpdatedTime: item.updated_at,
  }));
  return { roleData, count };
}

export function add(params) {
  return api.post("/services/uaa/api/v2/groups", params);
}

export function update(params, id) {
  return api.put("/services/uaa/api/v2/groups/" + id, params);
}
export function getRoleInfo(id) {
  return api.get("/services/uaa/api/v2/groups/" + id);
}

export function del(id) {
  return api.delete("/services/uaa/api/v2/groups/" + id);
}
