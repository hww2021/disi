import api from "@/api/request.js";
import { stringify } from "qs";

export async function getData(data) {
  const params = {
    ...data,
    o: "-updated_at",
    q: data.q === "" ? undefined : data.q,
    id: data.id === "" ? undefined : data.id,
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
  }));
  return { userData, count };
}
