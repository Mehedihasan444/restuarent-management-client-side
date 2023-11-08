import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  return (
    <div>
      <div className="card  glass">
        <figure>
          <img src={food.foodImage} alt={food.foodName} className="h-[245px]" />
        </figure>
        <div className="card-body p-3">
          <span className="">{food.foodCategory}</span>
          <h2 className="card-title">{food.foodName}</h2>
          <div className="flex justify-between items-center ">
            <p>Price: ${food.price}</p>
            <p>Quantity: {food.quantity}</p>
          </div>
          <div className="card-actions justify-end">
          <p className="">selling: {food.sellCount}</p>
            <Link to={`/foodDetails/${food._id}`}><button className="btn btn-sm btn-outline">Details</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
