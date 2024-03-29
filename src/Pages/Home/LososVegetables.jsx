import React from 'react';
import H1Tag from '../../CustomTags/H1Tag';

const LososVegetables = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto space-y-3 md:h-screen my-10  px-5 sm:flex justify-between items-center gap-5">
          <div className="flex-1" 
    //       data-aos="fade-right"
    // data-aos-offset="200"
    // data-aos-delay="50"
    // data-aos-duration="1000"
    // data-aos-easing="ease-in-out"
    // data-aos-mirror="true"
    // data-aos-once="false"
    // data-aos-anchor-placement="top-center"
    >
            <img
              src="https://savory.qodeinteractive.com/wp-content/uploads/2016/10/white-home-img4.jpg"
              alt=""
              className="w-full"
            />
          </div>
          <div className="flex-1 space-y-4 "
    //        data-aos="fade-left"
    // data-aos-offset="200"
    // data-aos-delay="50"
    // data-aos-duration="1000"
    // data-aos-easing="ease-in-out"
    // data-aos-mirror="true"
    // data-aos-once="false"
    // data-aos-anchor-placement="top-center"
    >
            <p className="" >TASTY AND CRUNCHY</p>
            <H1Tag>Losos & Vegetables</H1Tag>
            <p className="text-justify">
              Indulge in the delectable harmony of fresh, succulent salmon
              paired with a vibrant medley of seasonal vegetables. Our Salmon &
              Vegetables dish offers a perfect blend of flavors and textures,
              with the rich, buttery salmon fillet perfectly complemented by the
              crispness of sautéed vegetables. Savor the natural goodness of
              this wholesome meal, as it takes your taste buds on a culinary
              journey of delight and nourishment. Whether you're a seafood
              enthusiast or simply looking for a wholesome and flavorful option,
              our Salmon & Vegetables dish is a culinary masterpiece you won't
              want to miss.
            </p>
            <div className="">
               <a href="/all-foods" className="">

            <button className="btn btn-accent text-white">View Our Menu</button>
            </a>
            </div>
           
          </div>
        </div>
        </div>
    );
};

export default LososVegetables;