function Books({ item }) {
  return (
    <>
      <div
        key={item.id}
        className="p-2 hover:cursor-pointer hover:font-black text-white"
      >
        Title : {item.title} <br />
        Length : {item.totaltime}, Language : {item.language} <br />
        Author : {item.authors[0].first_name} ({item.authors[0].dob}-
        {item.authors[0].dod}) <br />
      </div>
    </>
  );
}

export default Books;
