import { useParams } from "react-router-dom";
function Book() {
  const { id } = useParams();
  return (
    <>
      <div>Book component : {id}</div>
    </>
  );
}

export default Book;
