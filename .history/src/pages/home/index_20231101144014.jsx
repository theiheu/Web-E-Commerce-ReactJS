import { Button } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Navigate to={"/register"} /> */}
      {/* <Navigate to={"/login"} /> */}
      <Button onClick={navigate("register")}>Login</Button>
    </div>
  );
};

export default Home;
