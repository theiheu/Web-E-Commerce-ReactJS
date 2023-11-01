import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navigate to={"/register"} />
      <Navigate to={"/login"} />
    </div>
  );
};

export default Home;
