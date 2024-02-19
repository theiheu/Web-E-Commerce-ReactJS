import { ScaleLoader } from "react-spinners";

const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <ScaleLoader color="#1d4ed8" />
    </div>
  );
};

export default Loading;
