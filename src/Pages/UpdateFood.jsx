import { useRef, useState } from "react";
import MaxWidth from "../CustomTags/MaxWidth";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet-async";
const popularCountries = ["USA", "Italy", "Japan", "Mexico", "India"];
const popularFoodCategories = [
  "Appetizer",
  "Main Course",
  "Dessert",
  "Beverage",
  "Salad",
  "Pasta",
  "Sushi",
  "Pizza",
];

const UpdateFood = () => {
  const { user } = useAuth();
  const name = useRef();
  const image = useRef();
  const category = useRef();
  const Quantity = useRef();
  const Price = useRef();
  const origin = useRef();
  const ShortDescription = useRef();
  const axios = useAxios();
  const { foodId } = useParams();

  //   console.log(foodId);
  const { isPending, data: foods } = useQuery({
    queryKey: ["foods", user, foodId],
    queryFn: async () => {
      const res = await axios.get(
        `/user/added-foods?userEmail=${user.email}&foodId=${foodId}`
      );
      // console.log(res.data);
      return res.data;
    },
    // refetchOnReconnect: true,
  });
  if (isPending) return <Loading></Loading>;

  console.log(foods.SingleResult);
  const handleSubmit = (e) => {
    e.preventDefault();

    const foodName = name.current.value;
    const foodImage = image.current.value;
    const foodCategory = category.current.value;
    const quantity = Quantity.current.value;
    const price = Price.current.value;
    const foodOrigin = origin.current.value;
    const shortDescription = ShortDescription.current.value;

    const information = {
      foodName,
      foodImage,
      foodCategory,
      quantity,
      price,
      foodOrigin,
      shortDescription,
    };
    console.log(information);

    axios.put(`/user/update-food/${foodId}`, information).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Oops...",
          text: "Update food successfully!",
        });
      }
    });
  };
  return (
    <div className=" mx-auto p-4 my-20">
      <Helmet>
        <title>Update Food</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <MaxWidth>
        {" "}
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Update Food
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md "
        >
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              readOnly
              className="border rounded-lg py-2 px-3 w-full"
              //   value={userName}
              defaultValue={user?.displayName}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="userEmail"
              readOnly
              className="border rounded-lg py-2 px-3 w-full"
              defaultValue={user?.email}
              //   value={userEmail}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-gray-600">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              className="border rounded-lg py-2 px-3 w-full"
              defaultValue={foods.SingleResult.foodName}
              ref={name}
            />
          </div>
          <div className="flex gap-5 items-center">
            <div className="mb-4 flex-1">
              <label htmlFor="foodCategory" className="block text-gray-600">
                Food Category
              </label>
              <select
                id="foodCategory"
                className="border rounded-lg py-2 px-3 w-full"
                defaultValue={foods.SingleResult.foodCategory}
                ref={category}
              >
                <option value="">Select a category</option>
                {popularFoodCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex-1">
              <label htmlFor="foodImage" className="block text-gray-600">
                Food Image URL
              </label>
              <input
                type="url"
                id="foodImage"
                className="border rounded-lg py-2 px-3 w-full"
                defaultValue={foods.SingleResult.foodImage}
                ref={image}
              />
            </div>
          </div>

          <div className="flex gap-5  items-center">
            <div className="mb-4 flex-1">
              <label htmlFor="quantity" className="block text-gray-600">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="border rounded-lg py-2 px-3 w-full"
                defaultValue={foods.SingleResult.quantity}
                ref={Quantity}
              />
            </div>

            <div className="mb-4 flex-1">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="border rounded-lg py-2 px-3 w-full"
                defaultValue={foods.SingleResult.price}
                ref={Price}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="foodOrigin" className="block text-gray-600">
              Food Origin (Country)
            </label>
            <select
              id="foodOrigin"
              className="border rounded-lg py-2 px-3 w-full"
              defaultValue={foods.SingleResult.foodOrigin}
              ref={origin}
            >
              <option value="">Select a country</option>
              {popularCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-gray-600">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              className="border rounded-lg py-2 px-3 w-full"
              defaultValue={foods.SingleResult.shortDescription}
              ref={ShortDescription}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Update Food
          </button>
        </form>
      </MaxWidth>
    </div>
  );
};

export default UpdateFood;
