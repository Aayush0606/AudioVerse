import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
function Book() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [bookImage, setBookImage] = useState("");

  const getSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

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
          const imageUrl = xmlDoc
            .querySelector("channel > itunes\\:image, image")
            .getAttribute("href");
          const items = Array.from(xmlDoc.querySelectorAll("item"));
          const chapterFetchedData = items.map((item) => ({
            title: item.querySelector("title").textContent.trim(),
            audioLink: item.querySelector("enclosure").getAttribute("url"),
            duration: getSeconds(
              item
                .querySelector("itunes\\:duration, duration")
                .textContent.trim()
            ),
          }));
          setTitle(bookTitle);
          setDescription(bookDescription);
          setChapters(chapterFetchedData);
          setBookImage(imageUrl);
          const localStorageData =
            JSON.parse(localStorage.getItem("liked")) || [];
          localStorageData.forEach((item) => {
            if (item.id === id) setIsLiked(true);
          });
        })
        .catch((error) => console.log("Error", error))
        .finally(() => setLoading(false));
    })();
  }, []);

  const toggleLike = () => {
    let localStorageData = JSON.parse(localStorage.getItem("liked")) || [];
    if (isLiked) {
      localStorageData = localStorageData.filter((item) => item.id !== id);
    } else {
      localStorageData.push({ title, id });
    }
    setIsLiked(!isLiked);
    localStorage.setItem("liked", JSON.stringify(localStorageData));
  };

  if (loading)
    return (
      <div className="text-white mb-auto overflow-y-scroll no-scrollbar">
        Loading....
      </div>
    );
  return (
    <>
      <div className="p-2">
        <div className="font-bold text-5xl md:text-7xl font-['Open_Sans'] ">
          <span>
            {title}
            <svg
              onClick={toggleLike}
              className={`${
                isLiked ? "text-yellow-300" : "text-gray-400"
              } group-hover:text-blue-500 inline-block ml-4 hover:cursor-pointer`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
            </svg>
          </span>
        </div>
        <div className="text-white text-xl md:text-3xl text-semibold mt-2">
          {description}
        </div>
        <div className="text-white text-xl text-medium mt-2">
          <MusicPlayer chapters={chapters} bookImage={bookImage} />
        </div>
      </div>
    </>
  );
}

export default Book;
