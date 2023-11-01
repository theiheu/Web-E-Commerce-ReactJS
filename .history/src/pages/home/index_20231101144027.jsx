import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={navigate("/register")}>Login</Button>
    </div>
  );
};

export default Home;
