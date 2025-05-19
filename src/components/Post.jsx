import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deletePost, updatePost } from "../api";

function Post({ data, pageNumber }) {
  const [userUpdating, setUserUpdating] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title); // keep local to Post

  const handleEditClick = () => {
    setUserUpdating(true);
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (apiData, id) => {
      queryClient.setQueriesData(["product", pageNumber], (cache) => {
        return cache.filter((cacheItem) => {
          return cacheItem.id !== id;
        });
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id, newTitle),
    onSuccess: (apiData, id) => {
      queryClient.setQueryData(["product", pageNumber], (cache) => {
        return cache.map((cacheItem) => {
          if (cacheItem.id === id) {
            return { ...cacheItem, title: apiData.data.title };
          }
          return cacheItem;
        });
      });
    },
  });

  return (
    <li className="bg-blue-600 rounded-xl shadow-md p-5 hover:bg-blue-700 transition-all duration-300 cursor-pointer list-none">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            {data.id}.{" "}
            {userUpdating ? (
              <input
                className="text-black px-2 py-1 rounded"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            ) : (
              data.title
            )}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-white/90">
            {data.body}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
            onClick={() => deleteMutation.mutate(data.id)}
          >
            Delete
          </button>

          {userUpdating ? (
            <button
              className="bg-white hover:bg-green-600 hover:text-white text-black px-4 py-2 rounded-full transition"
              onClick={() => {
                setUserUpdating(false);
                updateMutation.mutate(data.id);
              }}
            >
              Update
            </button>
          ) : (
            <button
              className="bg-white hover:bg-yellow-300 text-black px-4 py-2 rounded-full transition"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Post;
