import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../api";

function Product() {
  const { id } = useParams();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{error.message}</h1>;
  return (
    <div className="h-[calc(100vh_-_56px)] flex justify-center items-center">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-2xl shadow-xl p-6 max-w-md hover:shadow-2xl transition duration-300 ease-in-out">
        <h1 className="text-2xl font-extrabold mb-2 text-blue-400">
          {data.title}
        </h1>
        <p className="text-sm text-zinc-300 leading-relaxed">{data.body}</p>
      </div>
      <button className="absolute left-10 px-6 py-2 bg-blue-600 font-bold text-white rounded-2xl bottom-20 cursor-pointer">
        <Link to="/products">Go back...</Link>
      </button>
    </div>
  );
}

export default Product;
