import { useLottie } from "lottie-react";
import animationData from "../lotties/kiss-of-the-heart.json.json";
const Loading = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };
  const { View } = useLottie(options);
  return <div className="flex justify-center">
    <div className="w-72">{View}</div>
  </div>;
};

export default Loading;
