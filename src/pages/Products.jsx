import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    <div className="bg-[#333] text-white min-h-screen">
      <ul className="px-10 sm:px-20 pt-20">
        {data.map((item) => (
          <Link key={item.id} to={`/post/${item.id}`}>
            <li className="mb-6 p-5 bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                {item.id + `. `}
                {item.title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-white/90">
                {item.body}
              </p>
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex m-10">
        <button
          disabled={pageNumber === 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl disabled:bg-red-500 cursor-pointer disabled:cursor-not-allowed"
          onClick={prevPage}
        >
          Prev
        </button>
        <p className="flex justify-center items-center mx-4">{pageNumber}</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-xl cursor-pointer"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Products;
