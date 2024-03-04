import InfiniteScroll from "react-infinite-scroll-component";
import Books from "../../components/Books/Books";
import { handlePagination } from "../../app/reducers/booksSlice";
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
  const dispatch = useDispatch();
  const booksState = useSelector((data) => data.booksState);
  const fetchNewData = async () => {
    await fetch(
      `${booksState.baseURL}?offset=${
        (booksState.offset + 1) * booksState.limit
      }&limit=${booksState.limit}&format=json&fields=${booksState.fields}`
    )
      .then((data) => data.json())
      .then((data) => dispatch(handlePagination({ newBookList: data.books })));
  };
  return (
    <>
      <div className="mb-auto overflow-y-scroll no-scrollbar">
        <InfiniteScroll
          className="no-scrollbar"
          dataLength={booksState.booklist.length}
          loader={<div className="text-white">Loading.....</div>}
          next={fetchNewData}
          hasMore={true}
          height={800}
        >
          {booksState.booklist.map((item) => (
            <Books key={item?.id} item={item} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default HomePage;
