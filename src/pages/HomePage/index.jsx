import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/register")}>Register</Button>
    </div>
  );
};

export default HomePage;
