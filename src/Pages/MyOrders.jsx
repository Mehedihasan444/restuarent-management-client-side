import { useQuery } from "@tanstack/react-query";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import MaxWidth from "../CustomTags/MaxWidth";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
const MyOrders = () => {

    const { user } = useAuth();
    const axios = useAxios();
    const {isPending,data: orders} = useQuery({
      queryKey: ["user.email"],
      queryFn: async () => {
        const res = await axios.get(`/user/food-orders/${user.email}`);
        return res.data;
      },
    });
  //   console.log(order);
    if (isPending) return <Loading></Loading>;
  
    return (
        <MaxWidth>
        <div className="overflow-x-auto my-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price</th>
                <th>Order Date</th>
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
                  <th>
                    <div className="flex justify-evenly items-center text-xl">
                      <FiEdit></FiEdit>
                      <MdOutlineDeleteOutline></MdOutlineDeleteOutline>
                     
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