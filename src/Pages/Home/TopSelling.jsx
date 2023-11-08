import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios";
import H1Tag from "../../CustomTags/H1Tag";
import Loading from "../../Components/Loading";
import useAuth from "../../CustomHooks/useAuth";
import OrderCard from "../../Components/OrderCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import MaxWidth from "../../CustomTags/MaxWidth";
import { Link } from "react-router-dom";

const TopSelling = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { isPending, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`/foods/desc`);
      // console.log(res.data);
      return res.data;
    },
  });
  //   console.log(order);
  if (isPending) return <Loading></Loading>;

  return (
    <MaxWidth>
      <div className="my-16 sm:h-[90vh] px-5">
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
            navigation={true}
            modules={[Navigation]}
            spaceBetween={30}
            breakpoints={{
              // when window width is >= 576px
              // 576: {
              //   width: 576,
              //   slidesPerView: 2,
              // },
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              768: {
                width: 768,
                slidesPerView: 2.5,
              },
              // when window width is >= 1024px
              1024: {
                width: 1024,
                slidesPerView: 4,
              },
            }}
            className="mySwiper "
          >
            {orders?.map((order) => (
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
