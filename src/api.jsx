import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

const gitApi = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_URL,
});

async function fetchProducts(pageNumber) {
  const start = (pageNumber - 1) * 3;
  const res = await api.get(`posts?_start=${start}&_limit=3`);
  return res.status === 200 ? res.data : [];
}
async function fetchPost(id) {
  const res = await api.get(`posts/${id}`);
  return res.status === 200 ? res.data : [];
}
async function deletePost(id) {
  return await api.delete(`posts/${id}`);
}
async function updatePost(id, newTitle) {
  return await api.patch(`posts/${id}`, { title: newTitle });
}
async function fetchingGithubUsers({ pageParam = 1 }) {
  const res = await gitApi.get(
    `search/users?q=tom&per_page=10&page=${pageParam}`
  );
  return res.data.items;
}

export {
  fetchProducts,
  fetchPost,
  deletePost,
  updatePost,
  fetchingGithubUsers,
};
