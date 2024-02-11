import { useQuery } from "@tanstack/react-query";
import Cart_card from "../Components/Cart_card";
import useAxios from "../CustomHooks/useAxios";
import useAuth from "../CustomHooks/useAuth";
import Loading from "../Components/Loading";
const Cart = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const { isPending, data: cartItems = [],refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await axios.get(`/user/cart/${user.email}`);
      return res.data;
    },
  });
  console.log(cartItems);
  if (isPending) return <Loading></Loading>;

  let totalAmount = 0;

  for (let i = 0; i < cartItems.length; i++) {
     totalAmount +=parseInt(cartItems[i].price);
    
    
  }
  refetch()
  return (
    <div className="min-h-screen relative">
      <h1 className="text-xl font-semibold max-w-5xl mx-auto text-center mt-5">
        Available items: {cartItems.length}
      </h1>
      <div className="divider max-w-5xl mx-auto"></div>
      <div className="flex flex-col gap-5 justify-center items-center my-10">
        {cartItems.length==0?<div className=""><h1 className="text-xl font-semibold">You have not added any food yet!</h1></div>:cartItems.map((item) => (
          <Cart_card key={item._id} product={item} refetch={refetch}/>
        ))}
      </div>
      <div
        className="absolute bottom-2 right-0 left-0 max-w-5xl mx-auto flex justify-between items-center border p-10"
        style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}
      >
        <div className="">
          <h1 className="text-xl font-semibold ">
            Total amount: ${totalAmount}
          </h1>
        </div>
        <button className="btn btn-accent text-white">checkout</button>
      </div>
    </div>
  );
};

export default Cart;
