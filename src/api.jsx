import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
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

export { fetchProducts, fetchPost };
