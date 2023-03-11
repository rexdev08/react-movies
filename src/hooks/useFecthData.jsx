import { useState, useEffect } from "react";

const useFetchData = (category = "movie", order = "popular") => {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const key = "0dc5a070f36e84311c0ff991acad3019";

  const url = `
https://api.themoviedb.org/3/${category}/${order}?api_key=${key}&language=es-ES&page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        if (data.page >= 500 || data.page >= data.total_pages) {
          setHasMore(false);
        }

        // console.log(data);
        setInfo([...info, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  return [info, setPage, hasMore];
};

export default useFetchData;
