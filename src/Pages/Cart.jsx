

import Loading from "../Components/Loading";
import Cart_card from "../Components/Cart_card";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../CustomHooks/useAxios";
import useAuth from "../CustomHooks/useAuth";

const Cart = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    isPending,
    data: cartItems = [],
    refetch,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await axios.get(`/user/cart/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    let bill = 0;
    for (let i = 0; i < cartItems.length; i++) {
      bill += parseInt(cartItems[i].price);
    }
    setTotalAmount(bill);
  }, [cartItems]);

  const handlePayment = async () => {
    const info = {
      totalBill: totalAmount,
      userName: user.displayName,
      userEmail: user.email,
      status: "pending",
      payment: "pending",
      transactionId: "",
      cartItems,
    };
    const res = await axios.post("/user/foods/payment", info);
    window.location.replace(res.data.url);
  };

  return (
    <div className="relative">
      <h1 className="text-xl font-semibold max-w-5xl mx-auto text-center mt-5">
        Available items: {cartItems.length}
      </h1>
      <div className="divider max-w-5xl mx-auto"></div>
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="space-y-5 my-10 max-w-5xl mx-auto mb-40">
          {isPending ? (
            <Loading />
          ) : cartItems.length === 0 ? (
            <div className="">
              <h1 className="text-xl font-semibold">
                You have not added any food yet!
              </h1>
            </div>
          ) : (
            cartItems.map((item) => (
              <Cart_card
                key={item._id}
                product={item}
                refetch={refetch}
                setTotalAmount={setTotalAmount}
                totalAmount={totalAmount}
              />
            ))
          )}
        </div>
      </div>

      <div className="z-50 right-0 top-[80vh] left-0 fixed max-w-5xl bg-slate-200 mx-auto flex justify-between items-center border p-10" style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}>
        <div className="">
          <h1 className="text-xl font-semibold">
            Total amount: ${totalAmount}
          </h1>
        </div>
        <button className="btn btn-accent text-white" onClick={handlePayment}>
          checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

