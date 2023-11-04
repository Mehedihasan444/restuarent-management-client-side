import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
const Banner = () => {
    return (
        
<Swiper navigation={true} modules={[Navigation]} className="mySwiper h-[80vh]">
        <SwiperSlide> <img src="https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?w=900&t=st=1699133424~exp=1699134024~hmac=998a1d957568f518670e1c4a89d3f969e8af74db7d18eae6185b9e3200ff7aa8" className="w-full h-full object-cover" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?w=900&t=st=1699133403~exp=1699134003~hmac=57967103a5aee8bf326ad3f5e9e8429bd2e43de058446d1b365ac1ceac1ee02c" className="w-full h-full object-cover" /></SwiperSlide>
        <SwiperSlide> <img src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1734.jpg?w=900&t=st=1699133374~exp=1699133974~hmac=502525861c75995bd52de8809b11e1e2ad2ebb37ee19e14f01d83370ea4da6f7" className="w-full h-full object-cover" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?w=900&t=st=1699133334~exp=1699133934~hmac=b2b1b6b8371dc1826964a566c9a36c5d1b1663154c3ac39b2811d26189fd8ea3" className="w-full h-full object-cover" /> </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
      </Swiper>
      
    );
};

export default Banner;