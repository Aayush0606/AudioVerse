import { Link } from "react-router-dom";
function Books({ item }) {
  return (
    <>
      <Link to={`/${item.id}`}>
        <div
          key={item.id}
          className="p-2 hover:cursor-pointer hover:text-violet-300 text-violet-50 transition-all duration-200"
        >
          <div className="font-black text-xl md:text-3xl font-sans">
            {item.title}
          </div>
          <div className="text-lg md:text-xl font-serif">
            ~{item.authors[0].first_name} {item.authors[0].last_name} (
            {item.authors[0].dob}-{item.authors[0].dod})
          </div>
        </div>
      </Link>
    </>
  );
}

export default Books;
