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
      const res = await axios.get(`/food/orders`);
      // console.log(res.data);
      return res.data;
    },
  });
  //   console.log(order);
  if (isPending) return <Loading></Loading>;

  return (
    <MaxWidth>
      <div className="mt-16 h-[90vh]">
        <div className="flex justify-between items-center">
        <H1Tag>Top Selling Foods</H1Tag>
        <Link to="/all-foods"><button className="btn btn-accent text-white">See All</button></Link>
        </div>
      <div className="my-5">
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={30} className="mySwiper">
          {orders.map((order) => (
            <SwiperSlide key={order._id}>
              <OrderCard order={order}></OrderCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
      
    </MaxWidth>
  );
};

export default TopSelling;
