import React from 'react';
import H1Tag from '../../CustomTags/H1Tag';

const Ingridients = () => {
    return (
        <div>
            <div className="flex justify-between  items-center gap-5 bg-[#ebebeb] py-16">
        <div className="max-w-7xl mx-auto sm:flex justify-between items-center gap-5">
          <div className="flex-1 space-y-4">
            <p className="">TASTY AND CRUNCHY</p>
            <H1Tag>INGREDIENTS</H1Tag>
            <p className="">
              Popular ingredients like garlic, olive oil, and tomatoes form the
              heart of Mediterranean cuisine, offering a symphony of flavors in
              dishes such as pasta, salads, and grilled meats. In Asian cooking,
              ginger and soy sauce create a harmonious blend of spice and umami,
              while coconut milk adds creaminess to curries. Herbs like basil
              and cilantro brighten up Italian and Latin American fare,
              respectively, infusing a fresh and aromatic essence. Parmesan
              cheese, cumin, and onions contribute depth and character to dishes
              from around the world, while the heat of chili peppers and the
              zing of lemon juice elevate a variety of recipes. These
              ingredients, with their unique tastes and textures, inspire
              culinary creativity and bring diverse cuisines to life.
            </p>
            <button className="btn btn-accent text-white">View Our Menu</button>
          </div>
          <div className="flex-1">
            <img
              src="https://savory.qodeinteractive.com/wp-content/uploads/2016/09/home1-main-image-4.jpg"
              alt=""
              className="w-full "
            />
          </div>
        </div>
      </div>
        </div>
    );
};

export default Ingridients;