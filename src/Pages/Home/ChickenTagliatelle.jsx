import React from 'react';
import H1Tag from '../../CustomTags/H1Tag';

const ChickenTagliatelle = () => {
    return (
        <div>
             <div className="max-w-7xl mx-auto px-5 md:h-screen text-justify space-y-3 sm:flex justify-between items-center gap-5">
          <div className="flex-1 space-y-4" 
    // data-aos="fade-bottom"
    // data-aos-offset="200"
    // data-aos-delay="50"
    // data-aos-duration="2000"
    // data-aos-easing="ease-in-out"
    // data-aos-mirror="true"
    // data-aos-once="false"
    // data-aos-anchor-placement="top-center"
    >
            <p className="">TASTY AND CRUNCHY</p>
            <H1Tag>Chicken Tagliatelle</H1Tag>

            <p className="">
              ndulge in the rich flavors of Italy with our Chicken Tagliatelle,
              a classic Italian pasta dish that's a true embodiment of comfort
              food. Tender pieces of grilled chicken are expertly paired with al
              dente tagliatelle pasta and enveloped in a creamy sauce infused
              with garlic, Parmesan cheese, and fresh herbs. Finished with a
              sprinkle of fragrant basil, this dish is a delightful journey to
              the heart of Italy, blending tradition with a touch of modern
              elegance.
            </p>
            <div className="">
               <a href="/all-foods" className="">

            <button className="btn btn-accent text-white">View Our Menu</button>
            </a>
            </div>
          </div>
          <div className="flex-1"
    //        data-aos="fade-top"
    // data-aos-offset="200"
    // data-aos-delay="50"
    // data-aos-duration="1000"
    // data-aos-easing="ease-in-out"
    // data-aos-mirror="true"
    // data-aos-once="false"
    // data-aos-anchor-placement="top-center"
    >
            <img
              src="https://savory.qodeinteractive.com/wp-content/uploads/2016/10/white-home-img5.jpg"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        </div>
    );
};

export default ChickenTagliatelle;