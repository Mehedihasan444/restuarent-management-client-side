import { useQuery } from "@tanstack/react-query";
import H1Tag from "../CustomTags/H1Tag";
import useAxios from "../CustomHooks/useAxios";
import FoodCard from "../Components/FoodCard";
import MaxWidth from "../CustomTags/MaxWidth";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
const AllFoods = () => {
  const axios = useAxios();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({});
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: foods,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [
      "foods",
      sortByPrice,
      categoryFilter,
      currentPage,
      itemsPerPage,
      numberOfPages,
      searchValue,
    ],
    queryFn: async () => {
      const response = await axios.get(
        `/foods?foodName=${searchValue}&category=${categoryFilter}&sortField=price&sortOrder=${sortByPrice}&page=${currentPage}&limit=${itemsPerPage}`
      );

      return response.data;
    },
  });

  useEffect(() => {
    if (foods) {
      setData(foods);
      const count = foods.count;
      // console.log(count);
      const NumOfPages = Math.ceil(count / itemsPerPage);
      setNumberOfPages(NumOfPages);
    }
  }, [foods, itemsPerPage, data]);

  const pages = [...Array(numberOfPages).keys()];
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = () => {
    setSearchValue(search);
    console.log(search);
  };
  // console.log(categoryFilter,sortByPrice);

  return (
    <MaxWidth>
      <Helmet>
        <title>All Foods</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="block text-center lg:hidden mt-10">
        <H1Tag>All Foods</H1Tag>
      </div>
      <div className="space-y-2 text-center sm:text-left sm:flex  lg:justify-between items-center mb-10 lg:my-10 px-3">
        <div className="hidden lg:flex">
          <H1Tag>All Foods</H1Tag>
        </div>
        {/* filtration */}
        <div className="flex justify-center items-end mx-5 md:w-1/2 lg:w-auto relative">
          <div className="form-control ">
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="input input-bordered rounded-full  w-80  "
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute top-4 right-8  lg:right-4 cursor-pointer">
              <BsSearch onClick={handleSearch}></BsSearch>
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center md:w-1/2 lg:w-auto">
          <div className="">
            {/* <label className="">Sort By Price</label> */}
            <select
              className="select w-full max-w-xs input-bordered"
              value={sortByPrice}
              // defaultValue={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
            >
              <option value="" selected disabled>
                Sort By Price
              </option>
              <option value="desc">High To Low</option>
              <option value="asc">Low To High</option>
            </select>
          </div>
          <div className="">
            {/* <label>Filter By Category</label> */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select w-full max-w-xs input-bordered"
            >
              <option value="" selected disabled>
                Select Category
              </option>
              <option value="">All</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Salad">Salad</option>
              <option value="Pasta">Pasta</option>
              <option value="Sushi">Sushi</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>
        </div>
      </div>
      {/* foods */}
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-5 px-5 mb-10">
        {isPending ? (
          <div className="flex justify-center items-center w-[85vw]">
            <Loading />
          </div>
        ) : (
          data.result?.map((food) => (
            <FoodCard key={food._id} food={food}></FoodCard>
          ))
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center sm:justify-end items-center pr-5">
        <div className="py-10 text-center">
          {/* <p>current page : {currentPage}</p> */}
          <button className="btn btn-accent mr-3 text-white" onClick={handlePreviousPage}>
            «
          </button>
          {pages.map((page) => (
            <button
              className={`${
                currentPage === page + 1 ? "btn-disabled" : "text-white"
              } mr-2 btn btn-accent`}
              key={page}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button className="btn btn-accent text-white" onClick={handleNextPage}>
            »
          </button>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="rounded-md ml-2 select  input-bordered"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </MaxWidth>
  );
};

export default AllFoods;
