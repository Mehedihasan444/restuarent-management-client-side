import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import useAxios from "../../CustomHooks/useAxios";
import { useEffect, useState } from "react";

const Banner = () => {
  const axios = useAxios();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/home-banner-slider").then((res) => setData(res.data));
  }, [axios]);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper h-[50vh] sm:h-screen"
    >
      {data.map((slide) => (
        <SwiperSlide className="relative" key={slide._id}>
          <img src={slide.image} className="w-full h-full" />
          <div className="absolute top-0 left-0 bg-gradient-to-r from-[#00000071] to-[#00000071]  right-0 bottom-0 flex justify-center items-center  ">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-6xl font-extrabold text-white text-center">
                {slide.headingTitle}
              </h1>
              <p className="text-gray-300 text-center">
                {slide.shortDescription}
              </p>
              <div className="flex justify-center items-center">
                <a href={slide.button.link} className="">
                  <button className="btn btn-sm text-xs sm:text-sm btn-accent text-white  sm:btn sm:btn-accent sm:text-white">
                    {slide.button.text}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
