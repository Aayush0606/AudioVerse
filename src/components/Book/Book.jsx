import { useState } from "react";

function Book({ title, description, chapters }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const handleClick = (url) => {
    if (audioUrl === url) {
      setAudioUrl("");
      setIsPlaying(false);
    } else {
      setAudioUrl(url);
      setIsPlaying(true);
    }
  };
  return (
    <>
      <div className="p-2">
        <div className="font-bold text-5xl md:text-7xl font-['Open_Sans']">
          {title}
        </div>
        <div className="text-white text-xl md:text-3xl text-semibold ">
          {description}
        </div>
        <div className="text-white text-xl text-medium mt-2">
          {chapters &&
            chapters.map((item, idx) => (
              <>
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

                    <div className="md:text-xl ml-2">{item.title}</div>
                  </div>
                  <div>
                    {isPlaying && item.audioLink === audioUrl && (
                      <audio src={audioUrl} autoPlay controls />
                    )}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default Book;
