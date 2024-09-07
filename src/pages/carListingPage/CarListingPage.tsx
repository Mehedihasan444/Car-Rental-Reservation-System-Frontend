import { CarsPageSideBer } from "./CarsPageSideBer";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import CarCard from "@/components/ui/CarCard";
import { TCar } from "@/types/TCar";
import Loading from "@/utils/Loading";
import { TQueries } from "@/types/TQueries";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CarListingPage = () => {
  const [queries, setQueries] = useState<TQueries>({ page: 1, limit: 10 });
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("");
  const { data = {}, isLoading } = useGetAllCarsQuery(
    searchTerm ? { page: 1, limit: 10, searchTerm: searchTerm } : queries
  );
  const { totalCount: count, cars } = data.data || {};
  const [currentPage, setCurrentPage] = useState(queries.page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(queries.limit || 10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    if (count > 0) {
      const numOfPages = Math.ceil(count / itemsPerPage);
      setNumberOfPages(numOfPages);
    }
  }, [count, itemsPerPage, data, queries]);

  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(1);
    setQueries({ ...queries, limit: val, page: 1 });
  };
console.log(count)
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setQueries({ ...queries, page: newPage });
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setQueries({ ...queries, page: newPage });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page + 1);
    setQueries({ ...queries, page: page + 1 });
  };
  return (
    <div className="lg:flex relative">
      <div className="lg:w-1/4 lg:p-4  md:flex-col md:flex lg:m-5 rounded-md md:mr-5">
        <CarsPageSideBer queries={queries} setQueries={setQueries} />
      </div>
      <div className="w-full lg:w-3/4 p-4 mx-5 md:mx-0 relative">
        <div className="flex justify-between items-center md:gap-10">
          <div className="hidden lg:flex justify-between items-center gap-5 mb-4 flex-1">
            <h2 className="text-sm">
              Cars Found:
              {cars?.length || 0}
            </h2>
          </div>
        </div>
        <hr />
        <div
          className={`mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  min-h-[50vh] gap-5 mb-8
          `}
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full absolute top-0 right-0 bottom-0 left-0">
              <Loading loading={isLoading} />
            </div>
          ) : !cars?.length ? (
            <h1 className="">No cars found</h1>
          ) : (
            cars?.map((car: TCar, idx: number) => (
              <CarCard {...car} key={idx} />
            ))
          )}
        </div>
        <div className="flex justify-center sm:justify-end items-center absolute bottom-5 right-5">
          <div className="text-center">
            <Button
              className="mr-3 text-green-300"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              «
            </Button>
            {pages?.map((page) => (
              <Button
                className={`mr-2 ${
                  currentPage === page + 1 ? "btn-disabled" : "text-green-500"
                }`}
                key={page}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </Button>
            ))}
            <Button
              className="text-green-300"
              onClick={handleNextPage}
              disabled={currentPage === numberOfPages}
            >
              »
            </Button>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="rounded-md ml-2 px-3 py-2 border focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
