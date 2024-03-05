import { useEffect, useRef, useState } from "react";
const MusicPlayer = ({ chapters, bookImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioIndex, setAudioIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const handleChapterClick = (url, idx) => {
    if (audioIndex && audioIndex === idx) {
      togglePlaying();
    } else {
      setIsPlaying(false);
      setAudioIndex(idx);
    }
  };

  const togglePlaying = () => {
    if (!audioIndex) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (audioIndex === chapters.length - 1) return;
    setIsPlaying(false);
    setAudioIndex(audioIndex + 1);
  };
  const handlePrevious = () => {
    if (audioIndex === 0) return;
    setIsPlaying(false);
    setAudioIndex(audioIndex - 1);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return `${h > 0 ? h + "h" : ""}${m > 0 || h > 0 ? m + "m" : ""}${
      s > 0 || (m === 0 && h === 0) ? s + "s" : ""
    }`;
  };
  const handleSliderChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
    if (audioIndex) audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    togglePlaying();
  }, [audioIndex]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center transition-all duration-200">
        <div className="text-white w-full center flex flex-col items-center gap-4">
          <div>
            <img src={bookImage} alt="bookImage" />
          </div>
          <div>
            {
              <audio
                className="hidden"
                src={audioIndex ? chapters[audioIndex].audioLink : ""}
                ref={audioRef}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              />
            }
          </div>
          <div className="flex flex-col items-center">
            <input
              type="range"
              min={0}
              max={audioIndex ? chapters[audioIndex].duration : 0}
              onChange={handleSliderChange}
              value={currentTime}
              className="w-72 rounded-lg overflow-hidden appearance-none bg-gray-700 h-4 "
            />
            <div>
              {audioIndex
                ? `${formatTime(
                    parseInt(audioRef.current.currentTime)
                  )}/${formatTime(chapters[audioIndex].duration)}`
                : "0h:0m:0s/0h:0m:0s"}
            </div>
          </div>
          {audioIndex ? (
            <div>{chapters[audioIndex].title}</div>
          ) : (
            <div>Select chapter to play</div>
          )}
          <div className="space-x-4 font-mono font-bold">
            <button onClick={handlePrevious}>
              <svg
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z" />
              </svg>
            </button>
            <button onClick={togglePlaying}>
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  fill="currentColor"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  fill="currentColor"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                </svg>
              )}
            </button>
            <button onClick={handleNext}>
              <svg
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 22v-20h2v20h-2zm-18 0l16-10-16-10v20z" />
              </svg>
            </button>
          </div>
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
                  onClick={() => handleChapterClick(item.audioLink, idx)}
                  className={`flex flex-col md:flex-row md:items-center hover:cursor-pointer ${
                    idx === audioIndex
                      ? "text-red-600"
                      : "text-violet-50 hover:text-violet-300"
                  } transition-all duration-200 p-2`}
                >
                  <div className="flex">
                    {idx === audioIndex && isPlaying ? (
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
                      {item.title} ({formatTime(item.duration)})
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
