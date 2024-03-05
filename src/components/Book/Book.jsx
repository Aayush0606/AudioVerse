import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Book() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLiked, setIsLiked] = useState(false);

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
            duration: item
              .querySelector("itunes\\:duration, duration")
              .textContent.trim(),
          }));
          setTitle(bookTitle);
          setDescription(bookDescription);
          setChapters(chapterFetchedData);
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

  if (loading)
    return (
      <div className="text-white mb-auto overflow-y-scroll no-scrollbar">
        Loading....
      </div>
    );

  const handleClick = (url) => {
    if (audioUrl === url) {
      setAudioUrl("");
      setIsPlaying(false);
    } else {
      setAudioUrl(url);
      setIsPlaying(true);
    }
  };
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
          {chapters &&
            chapters.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(item.audioLink)}
                className={`flex flex-col md:flex-row md:items-center hover:cursor-pointer hover:text-violet-300 ${
                  item.audioLink === audioUrl
                    ? "text-red-600"
                    : "text-violet-50"
                } transition-all duration-200 p-2`}
              >
                <div className="flex">
                  {item.audioLink === audioUrl ? (
                    <svg
                      className="text-white"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="currentColor"
                    >
                      <path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" />
                    </svg>
                  ) : (
                    <svg
                      className="text-white"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="currentColor"
                    >
                      <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
                    </svg>
                  )}

                  <div className="md:text-xl ml-2">
                    {item.title} ({item.duration})
                  </div>
                </div>
                <div>
                  {isPlaying && item.audioLink === audioUrl && (
                    <audio src={audioUrl} autoPlay controls />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Book;
