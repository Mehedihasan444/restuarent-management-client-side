import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
const FoodGallary = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("./FoodGallary.json")
    .then(data=>data.json())
    .then((res) => setData(res));
    console.log(data);
  }, [ data]);
  return (
    <div className="mt-10">
      <Swiper
        navigation={false}
        modules={[Navigation]}
        slidesPerView={4}
        loop={true}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodGallary;
