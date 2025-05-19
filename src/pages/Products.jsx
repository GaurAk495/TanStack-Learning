import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { useState } from "react";
import Post from "../components/Post";

function Products() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", pageNumber],
    queryFn: () => fetchProducts(pageNumber),
    placeholderData: keepPreviousData,
  });

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="bg-[#333] text-white min-h-screen py-10">
      <ul className="px-4 sm:px-10 md:px-20 space-y-6">
        {data.map((item) => (
          <Post key={item.id} data={item} pageNumber={pageNumber} />
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-16">
        <button
          disabled={pageNumber === 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl disabled:bg-red-500 disabled:cursor-not-allowed transition"
          onClick={prevPage}
        >
          Prev
        </button>
        <p className="text-lg">{pageNumber}</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-xl transition"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Products;
