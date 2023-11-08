import { useState } from "react";
import MaxWidth from "../CustomTags/MaxWidth";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Swal from "sweetalert2";
const popularCountries = ["USA", "Italy", "Japan", "Mexico", "India"];
const popularFoodCategories = [
  "Appetizer","Main Course","Dessert","Beverage","Salad","Pasta","Sushi","Pizza"];

const AddFood = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.displayName);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [foodOrigin, setFoodOrigin] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const axios = useAxios();
  const handleSubmit = (e) => {
    e.preventDefault();
const sellCount = 0;
    const information = {
      foodName,foodImage,foodCategory,quantity,price,foodOrigin,shortDescription,userName,userEmail,sellCount};
    // console.log(information);
    axios
      .post("/user/add-food", information)
      .then((res) => {
        if (res.data.acknowledged) {
            Swal.fire({
                icon: "success",
                title: "Oops...",
                text: "Your food added successfully!",
              });
        }
      });
  };
  return (
    <div className=" mx-auto p-4 my-20">
      <MaxWidth>
        {" "}
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Add Food
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md "
        >
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              readOnly
              className="border rounded-lg py-2 px-3 w-full"
              //   value={userName}
              defaultValue={user?.displayName}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="userEmail"
              readOnly
              className="border rounded-lg py-2 px-3 w-full"
              defaultValue={user?.email}
              //   value={userEmail}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-gray-600">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              className="border rounded-lg py-2 px-3 w-full"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>
          <div className="flex gap-5 items-center">
            <div className="mb-4 flex-1">
              <label htmlFor="foodCategory" className="block text-gray-600">
                Food Category
              </label>
              <select
                id="foodCategory"
                className="border rounded-lg py-2 px-3 w-full"
                value={foodCategory}
                onChange={(e) => setFoodCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {popularFoodCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex-1">
              <label htmlFor="foodImage" className="block text-gray-600">
                Food Image
              </label>
              <input
                type="file"
                id="foodImage"
                className="border rounded-lg py-2 px-3 w-full"
                value={foodImage}
                onChange={(e) => setFoodImage(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-5  items-center">
            <div className="mb-4 flex-1">
              <label htmlFor="quantity" className="block text-gray-600">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="border rounded-lg py-2 px-3 w-full"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-4 flex-1">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="border rounded-lg py-2 px-3 w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="foodOrigin" className="block text-gray-600">
              Food Origin (Country)
            </label>
            <select
              id="foodOrigin"
              className="border rounded-lg py-2 px-3 w-full"
              value={foodOrigin}
              onChange={(e) => setFoodOrigin(e.target.value)}
            >
              <option value="">Select a country</option>
              {popularCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-gray-600">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              className="border rounded-lg py-2 px-3 w-full"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Add Item
          </button>
        </form>
      </MaxWidth>
    </div>
  );
};

export default AddFood;
