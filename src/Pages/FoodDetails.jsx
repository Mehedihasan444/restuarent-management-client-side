import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxios from "../CustomHooks/useAxios";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet-async";
import useAuth from "../CustomHooks/useAuth";

const FoodDetails = () => {
  const axios = useAxios();
  const { foodId } = useParams();
  const {user } = useAuth();
  // console.log(foodId);
  const {
    isPending,
  
    data: food,
  } = useQuery({
    queryKey: ["foodId"],
    queryFn: async () => {
      const res = await axios.get(`/foodDetails/${foodId}`);
      return res.data;
    },
  });
  // console.log(food);
  if (isPending) return <Loading></Loading>;

  const handleCart = async (food) => {

    const cartData={
     image: food.foodImage,
     category: food.foodCategory,
     name: food.foodName,
     origin: food.foodOrigin,
      price:food.price,
     stock: food.quantity,
     description:food.shortDescription,
userEmail:user.email,
    }
    const res = await axios.post("/user/cart", cartData);
    console.log(res.data);
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <Helmet>
        <title>Food Details</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="flex justify-between gap-5">
        <div className="flex-1 border flex justify-center items-center">
          <img src={food.foodImage} alt="" className="w-full" />
        </div>
        <div className="flex-1 space-y-4">
          <span className="">{food.foodCategory}</span>
          <p className="">
            Made by <span className="font-bold">{food.userName}</span>{" "}
          </p>
          <h1 className="text-4xl font-bold">{food.foodName}</h1>
          <div className="">
            <span className="font-semibold ">Country Origin:</span>{" "}
            {food.foodOrigin}
          </div>
          <p className="">
            <span className="font-semibold ">price:</span> ${food.price}.00
          </p>
          <p className="">
            <span className="font-semibold ">Quantity:</span> {food.quantity}
          </p>

          <div className="flex gap-10 items-center">
            <Link to={`/foodOrder/${food._id}`} className="">
              <button className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Order Now
              </button>
            </Link>
          {
            food.quantity>0?<Link to="/cart" className="">
              <button
                onClick={() => handleCart(food)}
                className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Add to cart
              </button>
            </Link>:""
          }  
            
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-3xl font-bold border my-5 p-3">Food Description</h1>
        <p>{food.shortDescription}</p>
      </div>
    </div>
  );
};

export default FoodDetails;
