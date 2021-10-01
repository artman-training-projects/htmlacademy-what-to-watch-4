import {URL} from "../const";

export default function userAdapter(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarSrc: `${URL}${user.avatar_url}`,
  };
}
