import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios";
import H1Tag from "../../CustomTags/H1Tag";
import Loading from "../../Components/Loading";
import OrderCard from "../../Components/OrderCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation, Autoplay } from "swiper/modules";
import MaxWidth from "../../CustomTags/MaxWidth";
import { Link } from "react-router-dom";

const TopSelling = () => {
  const axios = useAxios();

  const { isPending, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`/foods/desc`);
      return res.data;
    },
  });


  return (
    <MaxWidth>
      <div className="my-16 sm:h-[75vh] px-5">
        <div className="flex justify-between items-center">
          <H1Tag>Top Selling Foods</H1Tag>
          <Link to="/all-foods">
            <button className="btn btn-accent text-white hidden sm:flex">
              See All
            </button>
          </Link>
        </div>
        <div className="my-5 ">
          <Swiper
            navigation={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1.15}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              640: {
                width: 640,
                slidesPerView: 2,
              },

              768: {
                width: 768,
                slidesPerView: 2.5,
              },

              1024: {
                width: 1024,
                slidesPerView: 3.5,
              },
            }}
            className="mySwiper  h-[450px] px-5"
          >
            {isPending?<div className=""><Loading/></div>:orders?.slice(0, 10).map((order) => (
              <SwiperSlide key={order._id}>
                <OrderCard order={order}></OrderCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Link to="/all-foods" className="flex justify-center items-center">
          <button className="btn btn-accent text-white sm:hidden ">
            See All
          </button>
        </Link>
      </div>
    </MaxWidth>
  );
};

export default TopSelling;
