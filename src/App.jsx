import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { handleUpdate } from "./app/reducers/booksSlice";
import { Outlet } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const booksState = useSelector((data) => data.booksState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch(
        `${booksState.baseURL}?offset=${
          booksState.offset * booksState.limit
        }&limit=${booksState.limit}&format=json&fields=${booksState.fields}`
      )
        .then((data) => {
          if (data.status !== 200) {
            alert("No such book!!");
            throw new Error();
          }
          return data.json();
        })
        .then((data) => dispatch(handleUpdate({ newBookList: data.books })))
        .catch((err) => console.log("error", err))
        .finally(() => setLoading(false));
    })();
  }, [booksState.baseURL]);

  return (
    <>
      <div className="bg-black flex flex-col h-screen justify-between overflow-hidden">
        <Header />
        {loading ? (
          <div className="text-white mb-auto overflow-y-scroll no-scrollbar">
            Loading....
          </div>
        ) : (
          <Outlet />
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;
