import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  const limit = 20;
  const fields = `{id,authors,title}`;
  const [bookList, setBookList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [url, setUrl] = useState(`api/feed/audiobooks`);
  useEffect(() => {
    (async () => {
      await fetch(
        `${url}?offset=${offset}&limit=${limit}&format=json&fields=${fields}`
      )
        .then((data) => data.json())
        .then((data) => setBookList(data.books))
        .catch((err) => console.log("error", err));
    })();
  }, [url]);

  const fetchPaginationData = async () => {
    await fetch(
      `${url}?offset=${
        offset + limit
      }&limit=${limit}&format=json&fields=${fields}`
    )
      .then((data) => data.json())
      .then((data) => setBookList((prev) => prev.concat(data.books)))
      .catch((err) => console.log("error", err))
      .finally(() => setOffset((prev) => prev + limit));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.query.value;
    const searchBy = e.target.by.value;
    if (!searchQuery || searchQuery.trim() === "") {
      alert("Please enter valid input!!");
      setUrl("api/feed/audiobooks/");
      return;
    }
    if (!searchBy || searchBy.trim() === "") {
      alert("Please select valid type!!");
      setUrl("api/feed/audiobooks/");
      return;
    }
    let newUrl = `api/feed/audiobooks/${searchBy}`;
    if (searchBy === "title") newUrl += `/%5E${searchQuery}`;
    else newUrl += `/${searchQuery}`;
    console.log(newUrl);
    setUrl(newUrl);
    setOffset(0);
  };
  return (
    <>
      <div className="bg-black flex flex-col h-screen justify-between overflow-hidden">
        <Header handleSearchSubmit={handleSearchSubmit} />
        <HomePage
          bookList={bookList}
          fetchPaginationData={fetchPaginationData}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
