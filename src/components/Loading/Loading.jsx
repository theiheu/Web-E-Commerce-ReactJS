import { ScaleLoader } from "react-spinners";

const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style} className="flex flex-col items-center justify-center">
      <ScaleLoader color="#1d4ed8" />
      <p className="text-blue-600 font-medium">Vui lòng chờ 30s - 45s...</p>
    </div>
  );
};

export default Loading;
