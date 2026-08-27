import AllProducts from "@/websitePages/allProduct/AllProducts";

const AllProduct = async ({ params, searchParams }) => {
  const { id } = await params;
  let queryParams = await searchParams;

  // console.log("params", id);
  // console.log("query", queryParams);
  return (
    <div className="mx-[10px] sm:mx-[20px]">
      <AllProducts queryParams={queryParams} />
    </div>
  );
};

export default AllProduct;
