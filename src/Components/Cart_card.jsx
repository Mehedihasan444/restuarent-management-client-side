import { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import useAxios from "../CustomHooks/useAxios";
import Swal from "sweetalert2";
const Cart_card = ({ product,refetch }) => {
  const { _id, name, description, price, image, stock, category } = product;
  const [quantity, setQuantity] = useState(0);
const axios=useAxios()
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleDelete = async (id) => {
 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
         axios.delete(`/user/cart/delete-item/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "delete!",
              text: "product delete  successfully!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="flex items-center gap-5  max-w-5xl mx-auto ">
      {/* <div className="p-5 ">
        <input type="checkbox" className=" w-5 h-5" />
      </div> */}
      <div
        className="flex gap-5 items-center  "
        style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}
      >
        <div className="">
          <img
            src={image}
            alt={name}
            className="h-40 ml-5 w-full object-cover"
          />
        </div>
        <div className=" p-5 w-full">
          <div className="flex justify-between items-center">
            <span className=" text-sm text-gray-400">{category}</span>
            <div className="btn bg-transparent text-xl">

            <FaRegTrashCan onClick={()=>handleDelete(_id)} className=""/>
            </div>
          </div>
          <h2 className="font-semibold text-xl">{name}</h2>
          <span className="text-xs">stock: {stock}</span>
          <p className="text-sm text-gray-400">{description}</p>
          <span className="font-semibold">${price}</span>
          <div className="flex items-center justify-center mt-4">
            <button className="text-2xl" onClick={() => handleDecrease()}>
              <FaRegSquareMinus />
            </button>
            <input
              type="number"
              value={quantity}
              name="quantity"
              onChange={(event) => setQuantity(event.target.value)}
              className="w-12 mx-4 bg-base-200  pl-2"
            />
            <button className=" text-2xl" onClick={() => handleIncrease()}>
              <FaRegPlusSquare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart_card;
