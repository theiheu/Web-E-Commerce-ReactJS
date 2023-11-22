import { useLocation } from "react-router-dom";

const BookPage = () => {
  // given a location like this:
  let location = useLocation();

  // we can turn the location.search into URLSearchParams
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");
  console.log(`id:`, id);

  return <div className="mt-[300px]">{id}</div>;
};

export default BookPage;
