import { useState } from "react";
const MusicPlayer = ({ chapters, bookImage }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const handleClick = (url) => {
    if (audioUrl === url) setAudioUrl("");
    else setAudioUrl(url);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        <div className="text-white w-full center flex flex-col items-center md:items-end gap-4">
          <div className="rounded">
            <img src={bookImage} alt="bookImage" />
          </div>
          <div>{<audio src={audioUrl} autoPlay controls />}</div>
        </div>
        <div className=" w-full">
          <div className="text-3xl font-black font-mono">
            Recordings ({chapters.length}):
          </div>
          <div className="h-[52vh]  overflow-y-scroll no-scrollbar">
            {chapters &&
              chapters.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(item.audioLink)}
                  className={`flex flex-col md:flex-row md:items-center hover:cursor-pointer ${
                    item.audioLink === audioUrl
                      ? "text-red-600"
                      : "text-violet-50 hover:text-violet-300"
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
