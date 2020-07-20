const userAdapter = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarSrc: `https://4.react.pages.academy${user.avatar_url}`,
});

export default userAdapter;
