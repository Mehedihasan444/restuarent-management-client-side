import { useQuery } from "@tanstack/react-query";
import H1Tag from "../CustomTags/H1Tag";
import useAxios from "../CustomHooks/useAxios";
import FoodCard from "../Components/FoodCard";
import MaxWidth from "../CustomTags/MaxWidth";

const AllFoods = () => {
  const axios = useAxios();

  const {
    data: foods,
    isPending,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await axios.get("/foods");
      return response.data; // Return the data from the response
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <MaxWidth>
      <H1Tag>all foods</H1Tag>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-5 px-5 ">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </MaxWidth>
  );
};

export default AllFoods;
