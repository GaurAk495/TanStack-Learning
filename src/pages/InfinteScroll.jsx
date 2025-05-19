import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchingGithubUsers } from "../api";
import { useInView } from "react-intersection-observer";

function InfiniteScroll() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchingGithubUsers,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
  // const fetchMoreIfEnd = () => {
  //   const bottom =
  //     window.innerHeight + window.scrollY >=
  //     document.documentElement.scrollHeight - 20;
  //   if (bottom && hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", fetchMoreIfEnd);
  //   return () => {
  //     window.removeEventListener("scroll", fetchMoreIfEnd);
  //   };
  // }, [hasNextPage]);

  // implementing react-intersection-observer to figureOut whether the users has reach bottom or not
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="bg-gray-500 min-h-screen px-10 pt-8 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.pages?.map((page) => {
          return page.map((content) => {
            return (
              <div
                key={content.id}
                className="flex flex-col justify-center items-stretch text-center"
              >
                <img
                  src={`${content.avatar_url}`}
                  alt=""
                  className="rounded-full"
                />
                <p>{content.login}</p>
              </div>
            );
          });
        })}
      </div>
      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading"
          : hasNextPage
          ? "Scroll to view More"
          : "NO more Users"}
      </div>
    </>
  );
}

export default InfiniteScroll;
