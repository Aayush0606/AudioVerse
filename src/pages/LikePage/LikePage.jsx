import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LikePage() {
  const [likedBooks, setLikedBooks] = useState([]);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("liked")) || [];
    setLikedBooks(localStorageData);
  }, []);
  return (
    <div className="text-white mb-auto overflow-y-scroll no-scrollbar">
      <div className="text-white text-6xl font-black font-sans mb-4">
        Your liked books!!
      </div>
      {likedBooks.map((item) => (
        <div key={item.id}>
          <Link to={`/${item.id}`}>
            <div className="p-2 hover:cursor-pointer hover:text-violet-300 text-violet-50 transition-all duration-200">
              <div className=" text-xl  md:text-4xl font-mono">
                {item.title}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LikePage;
