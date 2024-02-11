import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  return (
    <div
      className="card  glass"
      style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px" }}
    >
      <figure>
        <img src={food.foodImage} alt={food.foodName} className="h-[245px]" />
      </figure>
      <div className="card-body p-3 ">
        <span className="text-sm">{food.foodCategory}</span>
        <h2 className="card-title">{food.foodName}</h2>
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-sm">Price: ${food.price}</p>
          <p className="font-semibold text-sm">Quantity: {food.quantity}</p>
        </div>
        <div className="card-actions justify-end">
          <p className="font-semibold text-sm">selling: {food.sellCount}</p>
          <Link to={`/foodDetails/${food._id}`}>
            <button className="btn btn-sm btn-outline">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
