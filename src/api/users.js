import api from "@/api/request.js";
import { stringify } from "qs";

//用户管理菜单-获取列表数据
export async function getData(data) {
  const params = {
    ...data,
    o: "-updated_at",
    q: data.q === "" ? undefined : data.q,
    id: data.id === "" ? undefined : data.id,
    site: data.site === "" ? undefined : data.site,
    group_id: data.group_id === "" ? undefined : data.group_id,
    is_active:
      data.is_active === "" || undefined
        ? undefined
        : data.is_active === 1
        ? true
        : false,
  };
  const { results, count } = await api.get(
    `/services/uaa/api/v2/users?${stringify(params)}`,
    params
  );
  const userData = results.map((item) => ({
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    name: item.full_name,
    username: item.username,
    phone: item.phone,
    email: item.email,
    siteIds: item.site_ids,
    roles: item.groups.map((item) => item.name).join("、"),
    groups: item.groups,
    status: item.is_active,
    note: item.note,
  }));
  return { userData, count };
}

//用户管理菜单-启用/停用用户
export function isActive(id, type) {
  return api.post(`/services/uaa/api/v2/users/${id}/${type}`);
}

//用户管理菜单-批量启用/停用用户
export function isBatchActive(id, type) {
  const param = { id: id };
  return api.post(`/services/uaa/api/v2/users/${type}`, param);
}

export function add(params) {
  return api.post("/services/uaa/api/v2/users", params);
}

export function update(id, params) {
  return api.put(`/services/uaa/api/v2/users/${id}`, params);
}

export function del(id) {
  return api.delete("/services/uaa/api/v2/users/" + id);
}
