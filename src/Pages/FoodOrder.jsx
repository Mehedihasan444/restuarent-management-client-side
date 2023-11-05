import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import MaxWidth from "../CustomTags/MaxWidth";
import useAuth from "../CustomHooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const FoodOrder = () => {
  const { foodId } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.displayName);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [orderDate, setOrderDate] = useState();

  const {
    isPending,
    error,
    data: food,
  } = useQuery({
    queryKey: ["foodId"],
    queryFn: async () => {
      const res = await axios.get(`/foodDetails/${foodId}`);
      return res.data;
    },
  });
  //   console.log(food);
  if (isPending) return <Loading></Loading>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const information = {
      foodName,
      quantity,
      price,
      orderDate,
      userName,
      userEmail,
    };
    // console.log(information);
    axios.post("/user/food-order", information).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Oops...",
          text: "Your order is successfully placed!",
        });
      }
    });
  };

 
  return (
    <div className=" mx-auto p-4 my-20">
      <MaxWidth>
        {" "}
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Order Food
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md "
        >
          <div className="flex gap-5 justify-between">
            <div className="mb-4 flex-1">
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
            <div className="mb-4 flex-1">
              <label htmlFor="orderDate" className="block text-gray-600">
               Order Date
              </label>
              <input
                type="date"
                id="orderDate"
                className="border rounded-lg py-2 px-3 w-full"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
            
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
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            
          >
            Placed Order
          </button>
        </form>
      </MaxWidth>
    </div>
  );
};

export default FoodOrder;
