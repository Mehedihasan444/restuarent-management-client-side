import Lottie from "lottie-react";
import groovyWalkAnimation from "../lotties/404.json";

const Error = () => {
  return (
    <div className="h-screen w-1/2 mx-auto">
      <Lottie animationData={groovyWalkAnimation} loop={true} />
    </div>
  );
};

export default Error;
