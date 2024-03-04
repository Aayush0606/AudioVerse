import { useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import { useParams } from "react-router-dom";

function BookPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetch(`/rss/${id}`)
        .then((data) => data.text())
        .then((data) => data)
        .catch((error) => console.log("Error", error))
        .finally(() => setLoading(false));
      const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
      console.log(xmlDoc);
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
      <Book />
    </div>
  );
}

export default BookPage;
