import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
  
      <div className="card  glass"style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}>
        <figure>
          <img
            src={order?.foodImage}
            alt={order?.foodName}
            className="h-[245px]"
          />
        </figure>
        <div className="card-body p-3">
          <span className="text-sm">{order?.foodCategory}</span>
          <h2 className="card-title">{order?.foodName}</h2>
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-sm">Price: ${order?.price}</p>
            <p className="font-semibold text-sm">Quantity: {order?.quantity}</p>
          </div>
          <div className="card-actions justify-end">
            <p className="font-semibold text-sm">selling: {order.sellCount}</p>
            <Link to={`/foodDetails/${order?._id}`}>
              <button className="btn btn-sm btn-outline">Details</button>
            </Link>
          </div>
        </div>
      </div>
   
  );
};

export default OrderCard;
