function Books({ item }) {
  return (
    <>
      <div
        key={item.id}
        className="p-2 hover:cursor-pointer hover:text-violet-300 text-violet-50 "
      >
        <div className="font-black text-xl md:text-3xl font-sans">
          {item.title}{" "}
        </div>
        <div className="text-lg md:text-xl font-serif">
          ~{item.authors[0].first_name} {item.authors[0].last_name} (
          {item.authors[0].dob}-{item.authors[0].dod})
        </div>
      </div>
    </>
  );
}

export default Books;
