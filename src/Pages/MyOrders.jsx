import { useQuery } from "@tanstack/react-query";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import MaxWidth from "../CustomTags/MaxWidth";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
const MyOrders = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { isPending, data: orders } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await axios.get(`/user/food-orders/${user.email}`);
      return res.data;
    },
  });
  //   console.log(order);
  if (isPending) return <Loading></Loading>;

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
                    <div>
                      <div className="font-bold">{order.foodName}</div>
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
