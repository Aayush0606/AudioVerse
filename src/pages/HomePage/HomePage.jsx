import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Books from "../../components/Books/Books";
function HomePage({ bookList, fetchPaginationData }) {
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
