"use client";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { Input, Radio, Spin, Table } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const { Search } = Input;

const Orders = () => {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const [pageLoading, setPageLoading] = useState(false);
  const [manageOrdersFilter, setManageOrdersFilter] = useState(["pending"]);
  const [orderAction, setorderAction] = useState(["pending"]);
  const [ordersData, setOrdersData] = useState([]);
  const [allOrdersData, setAllOrdersData] = useState([]);

  useEffect(() => {
    stopLoadingBar();
    adminGetAllOrdersFunApi("pending");
  }, []);
  useEffect(() => {
    if (ordersData?.length > 0) {
      addKeysAllorderDataFun();
    } else {
      setAllOrdersData([]);
    }
  }, [ordersData]);
  useEffect(() => {
    console.log("allOrdersData", allOrdersData);
  }, [allOrdersData]);

  // for route changes useffect calling the fun mange page loading start here
  useEffect(() => {
    browserUrlChangePageloadingfun();
  }, [pathname]);
  // for route changes useffect calling the fun mange page end here

  // addKeysAllorderDataFun is start from here
  const addKeysAllorderDataFun = () => {
    const newdata = ordersData.map((data) => ({ ...data, key: data?.id }));
    setAllOrdersData(newdata);
  };

  // addKeysAllorderDataFun is end here

  // onSearch bar fun api is start from here
  const onSearch = async (value, info) => {
    try {
      if (!value) {
        return;
      }
      console.log("search", value);
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminAllOrders}?name=${value}&order=${manageOrdersFilter[0]}`,
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
        return setOrdersData(result?.data);
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
        setOrdersData([]);
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

  // adminGetAllOrdersFunApi is start from here

  const adminGetAllOrdersFunApi = async (ord) => {
    try {
      startLoadingBar();
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminAllOrders}?order=${ord}`,
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
        stopLoadingBar();
        setPageLoading(false);
        return setOrdersData(result?.data);
        // return toast.success(result?.message);
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
        stopLoadingBar();
        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      stopLoadingBar();
      setPageLoading(false);
      // console.log(error?.message);
      return toast.error("server error", error?.message);
    }
  };
  // adminGetAllOrdersFunApi is end here

  // getOrders fun is start from here
  const getOrders = async (val) => {
    setManageOrdersFilter([val]);
    if (val == "allorders") {
      return await adminGetAllOrdersFunApi("allorders");
    }
    if (val == "pending") {
      return await adminGetAllOrdersFunApi("pending");
    }
    if (val == "delivered") {
      return await adminGetAllOrdersFunApi("delivered");
    }
    if (val == "completed") {
      return await adminGetAllOrdersFunApi("completed");
    }
    if (val == "inprogress") {
      return await adminGetAllOrdersFunApi("inprogress");
    }

    if (val == "canceled") {
      return await adminGetAllOrdersFunApi("canceled");
    }
  };
  // getOrders fun is end here

  // table data is start from here
  const handleStatusChange = (id, status) => {
    // console.log("Order ID:", id);
    // console.log("New Status:", status);
    setorderAction([status]);
  };

  // const dataSource = [
  //   {
  //     key: "1",
  //     id: "1",
  //     name: "arslan",
  //     orderid: 32,
  //     product: (
  //       <div className="flex items-center gap-3">
  //         <Image
  //           alt="images"
  //           src="https://res.cloudinary.com/tbf1ausw/image/upload/v1785165430/DairyFarmMedia/products/filefeed3fd7-81a2-4542-94ed-c88dc751cb5a/ssthhsmr5twmguo2ence.jpg"
  //           width={50}
  //           height={50}
  //         />{" "}
  //         <span className="tex-[13px] font-Poppins">ghee</span>
  //       </div>
  //     ),
  //     price: "5456",
  //     payment: "cod",
  //     contact: "0302-6878646",
  //     status: orderAction,
  //     action: orderAction[0],
  //   },
  //   {
  //     key: "2",
  //     id: "2",
  //     name: "ali",
  //     orderid: 32,
  //     product: (
  //       <div className="flex items-center gap-3">
  //         <Image
  //           alt="images"
  //           src="https://res.cloudinary.com/tbf1ausw/image/upload/v1785062665/DairyFarmMedia/products/filebda6a5cc-a5e9-4cb2-a5cb-ea2013303070/pnkt09nxvdd2uffrzbsn.jpg"
  //           width={50}
  //           height={50}
  //         />{" "}
  //         <span className="tex-[13px] font-Poppins">yogurt</span>
  //       </div>
  //     ),
  //     price: "5456",
  //     payment: "cod",
  //     contact: "0302-6878646",
  //     status: "pending",
  //     action: orderAction[0],
  //   },
  // ];
  const columns = [
    {
      title: "Order Id",
      width: 100,
      dataIndex: "id",
      fixed: "start",
    },
    {
      title: "Customer Name",
      width: 100,
      dataIndex: "user_name",
      fixed: "start",
    },
    {
      title: "User Id",
      width: 100,
      dataIndex: "users_id",
    },

    // {
    //   title: "Product Name",
    //   width: 100,
    //   dataIndex: "product",
    // },
    {
      title: "Total Price",
      width: 100,
      dataIndex: "total_price",
    },
    {
      title: "Payment",
      width: 100,
      dataIndex: "payment_status",
    },
    {
      title: "Phone No",
      width: 100,
      dataIndex: "contact_no",
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "order_status",
    },
    {
      title: "City",
      width: 100,
      dataIndex: "city",
    },
    {
      title: "Shipping Address",
      width: 100,
      dataIndex: "shipping_address",
    },
    {
      title: "Order Date",
      width: 100,
      dataIndex: "created_dat",
    },
    {
      title: "Action",
      width: 100,
      dataIndex: "action",
      fixed: "end",
      render: (action, record) => (
        <Radio.Group
          className="flex! flex-col! gap-2! text-nowrap"
          value={allOrdersData[0]?.order_status}
          onChange={(e) => handleStatusChange(record.id, e.target.value)}
        >
          <Radio className="text-[11px]! font-Poppins" value="pending">
            Pending
          </Radio>
          <Radio className="text-[11px]! font-Poppins" value="inProgress">
            In Progress
          </Radio>
          <Radio className="text-[11px]! font-Poppins" value="delivered">
            Delivered
          </Radio>
          <Radio className="text-[11px]! font-Poppins" value="completed">
            Completed
          </Radio>
          <Radio className="text-[11px]! font-Poppins" value="cancelled">
            Cancelled
          </Radio>
        </Radio.Group>
      ),
    },
  ];

  // table data is end here
  //

  // browserUrlChangePageloadingfun is start from here
  const browserUrlChangePageloadingfun = () => {
    // console.log("pageloadinfun call",pathname)
    // console.log("pageloadinfun call",frontendDevelopmentBaseUrl)
    const queryparam = searchparams.getAll("id");
    // console.log("pageloadinfun call",queryparam[0])

    if (
      `${frontendDevelopmentBaseUrl}/admin/orders?id=${queryparam[0]}` ==
      `${frontendDevelopmentBaseUrl}${pathname}?id=${queryparam[0]}`
    ) {
      setPageLoading(false);
    } else {
      setPageLoading(true);
    }
  };
  // browserUrlChangePageloadingfun is end here

  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px]">
      {pageLoading == false ? (
        <div className="max-w-[1400px] mx-auto">
          {/* search filter is start from here */}
          <div className="mt-[20px] flex justify-end">
            <Search
              placeholder="search order with  customer name"
              onSearch={onSearch}
              className="max-w-[300px]"
            />
          </div>
          {/* search filter is end here */}

          {/* filter section is start from here */}
          <div className="overflow-x-auto rounded-sm mt-[50px] flex items-center gap-4 py-[9px] sm:py-[5px] bg-lightGreen w-full sm:max-w-fit px-[50px]">
            <p
              className={`${manageOrdersFilter[0] == "pending" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("pending")}
            >
              Pending
            </p>
            <p
              className={`${manageOrdersFilter[0] == "inprogress" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("inprogress")}
            >
              InProgress
            </p>
            <p
              className={`${manageOrdersFilter[0] == "delivered" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("delivered")}
            >
              Dilvered
            </p>
            <p
              className={`${manageOrdersFilter[0] == "completed" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("completed")}
            >
              Completed
            </p>
            <p
              className={`${manageOrdersFilter[0] == "canceled" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("canceled")}
            >
              Canceled
            </p>
            <p
              className={`${manageOrdersFilter[0] == "allorders" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("allorders")}
            >
              All orders
            </p>
          </div>
          {/* filter section is end here */}

          {/* table section is start from  */}
          <Table
            bordered
            className="mt-[50px] [&_.ant-table-tbody>tr>td]:text-[13px] [&_.ant-table-tbody>tr>td]:font-Poppins"
            columns={columns}
            dataSource={allOrdersData}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      ) : (
        // table section is end here
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Orders;
