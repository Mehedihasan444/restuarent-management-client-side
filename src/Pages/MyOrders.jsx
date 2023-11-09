import { useQuery } from "@tanstack/react-query";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import MaxWidth from "../CustomTags/MaxWidth";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
const MyOrders = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [intervalMs, setIntervalMs] = React.useState(1000)
  // const [orders,setOrders]=useState()
  const { isPending, data: orders, isFetching} = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await axios.get(`/user/food-orders/${user.email}`);
      return res.data;
    },
    refetchInterval: intervalMs,
  });
    // console.log(order);
  if (isPending) return <Loading></Loading>;
// useEffect(()=>{
//   axios.get(`/user/food-orders/${user.email}`)
//   .then(res=>setOrders(res.data))
// },[axios,user.email])

  const handleCancel = async (id) => {
   await axios.delete(`/user/delete-order/${id}`).then((res) =>{
    console.log( res.data)
    if (res.data.deletedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Oops...",
        text: " Order cancel successfully!",
      });
    }
  });
  };

  return (
    <MaxWidth>
      <Helmet>
        <title>My Orders</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="overflow-x-auto my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl">
              <th>Food Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Order Date & Time</th>
              <th>Food Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {orders?.map((order) => (
              <tr key={order._id}>
                <td>
                  
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={order.foodImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{order.foodName}</div>
                      <div className="text-sm opacity-50">
                        {order.foodCategory}
                      </div>
                    </div>
                  </div>
                </td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.orderDate}</td>
                <td>{order.userName}</td>
                <th>
                  <div className="flex justify-start items-center">
                    <button
                      className="btn text-2xl"
                      onClick={() => {
                        handleCancel(order._id)
                      }}
                    >
                      <MdOutlineDeleteOutline></MdOutlineDeleteOutline>
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MaxWidth>
  );
};

export default MyOrders;
