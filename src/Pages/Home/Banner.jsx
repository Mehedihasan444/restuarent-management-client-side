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
    // const fetchData = async () => {
    //   await axios.get("/home-banner-slider").then((res) => setData(res.data));
    // };

    // fetchData();

    fetch('SliderData.json')
    .then((res)=>res.json())
    .then((data) => setData(data))
  }, [axios]);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper h-[50vh] sm:h-full"
    >
      {data.map((slide) => (
        //bg-gradient-to-r from-[#1dcdbb75] to-[#00000071]
        <SwiperSlide className="relative" key={slide._id}>
          <img src={slide.image} className="w-full  h-full object-cover " />
          <div className=" absolute top-8 left-8 md:top-32 lg:top-80 md:left-20 lg:left-40 flex justify-center items-center bg-gradient-to-r from-[#1dcdbb5b] to-[rgba(0,0,0,0.44)] p-5 md:p-10 rounded-md">
            <div
              className="space-y-4"
              data-aos="fade-right"
              // data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
            >
              <h1 className="text-2xl md:text-5xl lg:text-8xl font-semibold text-white text-left w-[250px] md:w-[450px] lg:w-[580px] ">
                {slide.headingTitle}
              </h1>
              <p className="text-gray-300 text-left text-xs sm:text-base w-[200px] md:w-[320px] lg:w-[580px]">
                {slide.shortDescription}
              </p>
              <div className="flex justify-start items-center">
                <a href={slide.button.link} className="">
                  <button className="btn btn-sm text-xs sm:text-sm btn-accent  text-white  sm:btn sm:btn-accent sm:text-white">
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
