import { useQuery } from "@tanstack/react-query";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Loading from "../Components/Loading";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import MaxWidth from "../CustomTags/MaxWidth";
import Swal from "sweetalert2";

const MyFoods = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { isPending, data: foods } = useQuery({
    queryKey: ["foods", user],
    queryFn: async () => {
      const res = await axios.get(`/user/added-foods/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
    refetchOnReconnect: true,
  });
  if (isPending) return <Loading></Loading>;

  // const handleUpdate=async (id)=>{
  //   await axios.put(`/user/delete-food/${id}`)
  //   .then(res=>{
  //     if(res.data.deletedCount>0){
  //       Swal.fire({
  //         icon: "success",
  //         title: "Oops...",
  //         text: " product delete  successfully!",

  //       });
  //     }
  //   });

  // }
  const handleDelete = async (id) => {
    await axios.delete(`/user/delete-food/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Oops...",
          text: " product delete  successfully!",
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
              <th>Country Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {foods?.map((food) => (
              <tr key={food._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={food.foodImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{food.foodName}</div>
                      <div className="text-sm opacity-50">
                        {food.foodCategory}
                      </div>
                    </div>
                  </div>
                </td>
                <td>${food.price}</td>
                <td>{food.quantity}</td>
                <td>{food.foodOrigin}</td>
                <th>
                  <div className="flex gap-5 items-center ">
                    <button
                      className="btn text-xl  "
                      onClick={() => {
                        handleUpdate;
                      }}
                    >
                      <FiEdit></FiEdit>
                    </button>
                    <button
                      className="btn text-2xl "
                      onClick={() => {
                        handleDelete(food._id);
                      }}
                    >
                      <MdOutlineDeleteOutline></MdOutlineDeleteOutline>
                    </button>
                    <button className="btn text-2xl ">
                      <AiOutlineEye></AiOutlineEye>
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

export default MyFoods;
