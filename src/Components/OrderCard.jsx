import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({order}) => {
    return (
        <div>
             <div className="card  glass">
        <figure>
          <img src={order?.foodImage} alt={order?.foodName} className="h-[245px]" />
        </figure>
        <div className="card-body p-3">
          <span className="">{order?.foodCategory}</span>
          <h2 className="card-title">{order?.foodName}</h2>
          <div className="flex justify-between items-center ">
            <p>Price: ${order?.price}</p>
            <p>Quantity: {order?.quantity}</p>
          </div>
          <div className="card-actions justify-end">
            <p className="">selling: {order.sellCount}</p>
            <Link to={`/foodDetails/${order?._id}`}><button className="btn btn-sm btn-outline">Details</button></Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default OrderCard;