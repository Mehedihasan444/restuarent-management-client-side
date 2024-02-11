import { useQuery } from "@tanstack/react-query";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import MaxWidth from "../CustomTags/MaxWidth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Customer_Order_List = () => {
  const { user } = useAuth();
  const axios = useAxios();

  const {
    isPending,
    data: orders = [],
    refetch,
  } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await axios.get("/customer-orders");
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/user/delete-order/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Order cancel successfully!",
              icon: "success",
            });
          }
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
            {orders.length == 0 ? (
              <div className="text-lg font-semibold">
                <h1>There is no order!</h1>
              </div>
            ) : isPending ? (
              <Loading></Loading>
            ) : (
              orders?.map((order) => (
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
                    <div className="flex justify-start items-center gap-2">
                      <button
                        className="btn btn-sm text-xs btn-error text-white"
                        onClick={() => {
                          handleCancel(order._id);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn  btn-sm text-xs btn-primary text-white"
                        onClick={() => {
                          handleCancel(order._id);
                        }}
                      >
                        Location
                      </button>
                      <button
                        className="btn btn-sm text-xs btn-accent text-white"
                        onClick={() => {
                          handleCancel(order._id);
                        }}
                      >
                        Status
                      </button>
                    </div>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MaxWidth>
  );
};

export default Customer_Order_List;
