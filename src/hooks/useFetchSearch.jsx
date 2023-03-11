import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const useFetchSearch = (category = "movie", search = "popular") => {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  // const {search} = useParams();
  const key = "0dc5a070f36e84311c0ff991acad3019";

  const url = `
  https://api.themoviedb.org/3/search/${category}?api_key=${key}&query=${search}&page=${page}`;

  useEffect(() => {
    setInfo([]);
    setPage(1);
  }, [search]);

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
  }, [loadMore]);

  // console.log("hola");

  return [info, setPage, hasMore, setLoadMore];
};

export default useFetchSearch;
