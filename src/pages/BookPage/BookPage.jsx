import { useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import { useParams } from "react-router-dom";

function BookPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      await fetch(`/rss/${id}`)
        .then((data) => data.text())
        .then((data) => {
          const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
          const bookTitle = xmlDoc.querySelector("channel > title").textContent;
          const bookDescription = xmlDoc.querySelector(
            "channel > description"
          ).textContent;
          const items = Array.from(xmlDoc.querySelectorAll("item"));
          const chapterFetchedData = items.map((item) => ({
            title: item.querySelector("title").textContent.trim(),
            audioLink: item.querySelector("enclosure").getAttribute("url"),
          }));
          setTitle(bookTitle);
          setDescription(bookDescription);
          setChapters(chapterFetchedData);
        })
        .catch((error) => console.log("Error", error))
        .finally(() => setLoading(false));
    })();
  }, []);

  if (loading)
    return (
      <div className="text-white mb-auto overflow-y-scroll no-scrollbar">
        Loading....
      </div>
    );

  return (
    <div className="text-white mb-auto overflow-y-scroll no-scrollbar">
      <Book title={title} description={description} chapters={chapters} />
    </div>
  );
}

export default BookPage;
