import { useState, useEffect } from "react";
import Books from "../../components/Books/Books";
import InfiniteScroll from "react-infinite-scroll-component";
function HomePage() {
  const limit = 20;
  const [bookList, setBookList] = useState([]);
  const [offset, setOffset] = useState(0);
  const fields = `{id,authors,title,language,totaltime}`;
  useEffect(() => {
    (async () => {
      await fetch(
        `api/feed/audiobooks?offset=${offset}&limit=${limit}&format=json&fields=${fields}`
      )
        .then((data) => data.json())
        .then((data) => setBookList(data.books))
        .catch((err) => console.log("error", err));
    })();
  }, []);

  const fetchPaginationData = async () => {
    await fetch(
      `api/feed/audiobooks?offset=${
        offset + limit
      }&limit=${limit}&format=json&fields=${fields}`
    )
      .then((data) => data.json())
      .then((data) => setBookList((prev) => prev.concat(data.books)))
      .catch((err) => console.log("error", err))
      .finally(() => setOffset((prev) => prev + limit));
  };

  return (
    <>
      <div className="mb-auto overflow-y-scroll no-scrollbar">
        <InfiniteScroll
          className="no-scrollbar"
          dataLength={bookList.length}
          loader={<div className="text-white">Loading.....</div>}
          next={fetchPaginationData}
          hasMore={true}
          height={800}
        >
          {bookList.map((item) => (
            <Books key={item.id} item={item} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default HomePage;
