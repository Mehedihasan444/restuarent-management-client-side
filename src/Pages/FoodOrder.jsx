import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import MaxWidth from "../CustomTags/MaxWidth";
import useAuth from "../CustomHooks/useAuth";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const FoodOrder = () => {
  const { foodId } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  // const [sellCount, setSellCount] = useState(1);
  const name = useRef();
  const Quantity = useRef();
  const Price = useRef();
  const address = useRef();
const nevigate=useNavigate()
  const { isPending, data: food } = useQuery({
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
    const userName = user.displayName;
    const userEmail = user.email;
    const foodCategory = food.foodCategory;
    const foodImage = food.foodImage;

    const foodName = name.current.value;
    const quantity = Quantity.current.value;
    const price = Price.current.value;
    const location = address.current.value;
    // setSellCount(sellCount + 1);

    const information = {
      foodName,
      foodImage,
      foodCategory,
      quantity,
      price,
      location,
      userName,
      userEmail,
      orderDate: new Date(),
      status: "pending",
      payment: "pending",
      transactionId: ""
    };
    // console.log(information);
    let updateQuantity;
    updateQuantity = food.quantity - Number(quantity);
    if (updateQuantity < 0 || Number(quantity) > food.quantity) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Stock is not available!",
      });
      return;
    }

    axios.post("/user/food-order", information).then((res) => {
      console.log("updatedQ", updateQuantity);
      if (quantity == 0) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Enter quantity!",
        });
        return;
      }

      // update quantity
      let updateSellCount = food.sellCount + Number(quantity);
  
      const updateQuantityObj = {
        quantity: updateQuantity,
        sellCount: updateSellCount,
      };
      if (updateQuantity >= 0 && res.data.acknowledged == true) {
        axios.put(`/foods/${food._id}`, updateQuantityObj).then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "Placed",
            text: "Your order is successfully placed!",
          });

        });
      }
    });
    nevigate("/myOrders")
  };

  return (
    <div className=" mx-auto p-4 my-20">
      <Helmet>
        <title>Food Order</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <MaxWidth>
        {" "}
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#1dcdbc] to-[#78f4e8] bg-clip-border text-white shadow-lg ">
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
                Location
              </label>
              <input
                type="text"
                id="address"
                required
                className="border rounded-lg py-2 px-3 w-full"
                // value={orderDate}
                ref={address}
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
              defaultValue={food.foodName}
              readOnly
              ref={name}
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
                required
                className="border rounded-lg py-2 px-3 w-full"
                // value={quantity}
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
                defaultValue={food.price}
                readOnly
                ref={Price}
              />
            </div>
          </div>
          {/* <Link to="/myOrders"> */}
            <button
              type="submit"
              className="bg-[#1dcdbc] hover:bg-[#2f837a] text-white py-2 px-4 rounded-lg"
            >
              Placed Order
            </button>
          {/* </Link> */}
        </form>
      </MaxWidth>
    </div>
  );
};

export default FoodOrder;
