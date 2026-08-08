"use client";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
const { Search } = Input;

const AdminAllProducts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const [pageLoading, setPageLoading] = useState(false);
  const [adminAllProducts, setAdminAllProducts] = useState([]);
  const [manageProductsFilter, setManageProductsFilter] = useState([
    "allproducts",
  ]);
  let datavalue =
    "plane yougurt natural kjhjlm kjhklm hiojopdjops khdiocn ijd coijdpocdsih";

  useEffect(() => {
    console.log("adminallproducts", adminAllProducts);
  }, [adminAllProducts]);

  useEffect(() => {
    adminGetAllProductsFunApi();
  }, []);

  // for route changes useffect calling the fun mange page loading start here
  useEffect(() => {
    browserUrlChangePageloadingfun();
  }, [pathname]);
  // for route changes useffect calling the fun mange page end here

  // browserUrlChangePageloadingfun is start from here
  const browserUrlChangePageloadingfun = () => {
    // console.log("pageloadinfun call",pathname)
    // console.log("pageloadinfun call",frontendDevelopmentBaseUrl)
    const queryparam = searchparams.getAll("id");
    // console.log("pageloadinfun call",queryparam[0])

    if (
      `${frontendDevelopmentBaseUrl}/admin/allProducts?id=${queryparam[0]}` ==
      `${frontendDevelopmentBaseUrl}${pathname}?id=${queryparam[0]}`
    ) {
      setPageLoading(false);
    } else {
      setPageLoading(true);
    }
  };
  // browserUrlChangePageloadingfun is end here

  // adminGetAllProductsFunApi fun is start from here
  const adminGetAllProductsFunApi = async () => {
    // adminGetAllProducts

    try {
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminGetAllProducts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        setPageLoading(false);
        setAdminAllProducts(result?.data);
        return toast.success(result?.message);
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };

  // adminGetAllProductsFunApi fun is end here

  // deleteProductFunApi is start from here
  const deleteProductFunApi = async (prodId, mediaAsset_folder) => {
    // console.log("prdouctid",prodId)
    // console.log("assetfolder",mediaAsset_folder)
    try {
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminDeleteProduct}?productid=${prodId}&mediaid=${mediaAsset_folder}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        toast.success(result?.message);
        return await adminGetAllProductsFunApi();
        // setPageLoading(false);
        // setAdminAllProducts(result?.data)
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  // deleteProductFunApi is end here

  // getInStockProductsFunApi fun is start from here
  const getInStockProductsFunApi = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.getInStockProducts}?stockStatus=Available`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        setPageLoading(false);
        return setAdminAllProducts(result?.data);
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setAdminAllProducts([]);
        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  // getInStockProductsFunApi fun is end here

  // getOutofStockProductsFunApi fun is start from here
  const getOutofStockProductsFunApi = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.getOutofStockProducts}?stockStatus=Available`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        setPageLoading(false);
        return setAdminAllProducts(result?.data);
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setAdminAllProducts([]);

        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  // getOutofStockProductsFunApi fun is end here

  // getProducts fun is start from here
  const getProducts = async (val) => {
    setManageProductsFilter([val]);
    if (val == "allproducts") {
      return await adminGetAllProductsFunApi();
    }
    if (val == "instock") {
      return await getInStockProductsFunApi();
    }
    if (val == "outofstock") {
      return await getOutofStockProductsFunApi();
    }
  };
  // getProducts fun is end here

  // onSearch bar fun api is start from here
  const onSearch = async (value, _e, info) => {
    try {
      if (!value) {
        return;
      }
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.getSearchFilterAllProducts}?name=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        setPageLoading(false);
        return setAdminAllProducts(result?.data);
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  // onSearch bar fun api is end here

  //
  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px]">
      {pageLoading == false ? (
        <div className="max-w-[1400px] mx-auto">
          <div className="mt-[50px] flex justify-end">
            <Search
              placeholder="search product with name"
              onSearch={onSearch}
              className="max-w-[300px]"
            />
          </div>
          <div className="overflow-x-auto rounded-sm mt-[50px] flex items-center gap-4 py-[9px] sm:py-[5px] bg-lightGreen w-full sm:max-w-fit px-[50px]">
            <p
              className={`${manageProductsFilter[0] == "allproducts" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getProducts("allproducts")}
            >
              All products
            </p>
            <p
              className={`${manageProductsFilter[0] == "instock" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getProducts("instock")}
            >
              InStock
            </p>
            <p
              className={`${manageProductsFilter[0] == "outofstock" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getProducts("outofstock")}
            >
              Out of Stock
            </p>
          </div>
          {/* //////// */}
          <div className="mt-[50px] md:mt-[60px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[60px] md:gap-[20px] lg:gap-[40px]">
            {/* card */}
            {/* loop is apply this div */}
            {adminAllProducts?.length > 0 ? (
              adminAllProducts?.map((prod, ind) => (
                <Link
                  key={ind}
                  href={""}
                  className="cursor-pointer border border-gray-200 rounded-sm"
                >
                  <div className=" bg-whiteGray h-[300px] rounded-sm">
                    <Image
                      alt="Image"
                      width={310}
                      height={200}
                      src={prod?.media[0]?.secure_url}
                      className="w-full h-full object-contain "
                    />
                  </div>
                  {/* card text Content */}
                  <div className="mt-[10px]">
                    <p className="font-Poppins text-[18px] text-center text-darkGray bolder font-bold">
                      {/* {datavalue} */}
                      {prod?.product_name}
                    </p>
                    <div className="mt-[10px] grid grid-cols-3 items-center justify-center">
                      <p className="font-Poppins text-[18px] text-textLightGray text-end">
                        {prod?.sellproduct_price_1kg}
                      </p>
                      <p className="flex justify-center items-center">|</p>
                      <p className="  ">
                        <MdDeleteOutline
                          className="text-red-600! text-[20px]! cursor-pointer "
                          onClick={() =>
                            deleteProductFunApi(
                              prod?.id,
                              prod?.media[0]?.asset_folder,
                            )
                          }
                        />
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center max-w-[1400px]  ">
                <p className="text-[18px] font-Poppins text-darkGreen">
                  No product found
                </p>
              </div>
            )}
            {/* card text Content */}
            {/* loop is apply this div */}
            {/* {card} */}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;
