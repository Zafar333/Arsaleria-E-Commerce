export const dynamic = "force-dynamic";

import ProductDetail from "@/websitePages/productDetail/ProductDetail";

const page = ({ params }) => {
  return (
    <div className="mx-[10px] sm:mx-[20px]">
      <ProductDetail params={params} />
    </div>
  );
};

export default page;
