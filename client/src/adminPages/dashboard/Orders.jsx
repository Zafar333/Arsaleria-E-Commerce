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
import { Button, Input, Radio, Spin, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const { Search } = Input;

const Orders = () => {
  const searchparams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pageLoading, setPageLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [allOrdersData, setAllOrdersData] = useState([]);
  const filters = searchparams.get("filter");

  useEffect(() => {
    stopLoadingBar();
  }, []);
  useEffect(() => {
    adminGetAllOrdersFunApi(filters);
  }, [filters]);
  useEffect(() => {
    if (ordersData?.length > 0) {
      addKeysAllorderDataFun();
    } else {
      setAllOrdersData([]);
    }
  }, [ordersData]);

  // for route changes useffect calling the fun mange page loading start here
  useEffect(() => {
    browserUrlChangePageloadingfun();
  }, [pathname]);
  // for route changes useffect calling the fun mange page end here

  // addKeysAllorderDataFun is start from here
  const addKeysAllorderDataFun = () => {
    const newdata = ordersData.map((data, ind) => ({ ...data, key: ind + 1 }));
    setAllOrdersData(newdata);
  };

  // addKeysAllorderDataFun is end here

  // onSearch bar fun api is start from here
  const onSearch = async (value, info) => {
    try {
      if (!value) {
        return toast.error("search bar is empty");
      }
      startLoadingBar();
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminAllOrders}?name=${value}&order=${filters}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        stopLoadingBar();
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
        stopLoadingBar();

        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(false);
      stopLoadingBar();

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
          cache: "no-store",
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
    const adminid = searchparams.get("id");
    router.replace(`/admin/orders?id=${adminid}&filter=${val}`);
  };
  // getOrders fun is end here

  // table data is start from here
  const handleStatusChange = async (id, status) => {
    try {
      startLoadingBar();
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminEditOrderProgressState}?orderProgressState=${status}&id=${id}`,
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
        setOrdersData([]);
        adminGetAllOrdersFunApi(filters);
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

  const columns = [
    {
      title: "NO",
      width: 100,
      dataIndex: "key",
      fixed: "start",
    },
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
      render: (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB");
      },
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
    {
      title: "Order Detail",
      key: "orderDetail",
      render: (_, record) => (
        <Button
          className="bg-lightGreen! text-[12px]! font-Poppins! text-darkGreen! cursor-pointer! border-none!"
          onClick={() => ViewOrderDetail(record)}
        >
          View Detail
        </Button>
      ),
      fixed: "end",
    },
  ];

  // table data is end here
  // ViewOrderDetail fun is start from here
  const ViewOrderDetail = (record) => {
    // console.log("Selected Order:", record);
    // console.log("Order ID:", record.id);

    startLoadingBar();
    router.push(
      `/admin/orders/orderDetail/${record.id}?id=${searchparams.get("id")}&filter=${filters}`,
    );

    // You can open a Drawer or navigate to the order detail page here.
  };
  // ViewOrderDetail fun is start from here

  // browserUrlChangePageloadingfun is start from here
  const browserUrlChangePageloadingfun = () => {
    const queryparam = searchparams.getAll("id");

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
              className={`${filters == "pending" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("pending")}
            >
              Pending
            </p>
            <p
              className={`${filters == "inProgress" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("inProgress")}
            >
              InProgress
            </p>
            <p
              className={`${filters == "delivered" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("delivered")}
            >
              Dilvered
            </p>
            <p
              className={`${filters == "completed" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("completed")}
            >
              Completed
            </p>
            <p
              className={`${filters == "cancelled" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("cancelled")}
            >
              Canceled
            </p>
            <p
              className={`${filters == "allorders" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("allorders")}
            >
              All orders
            </p>
          </div>
          {/* filter section is end here */}

          <div className="flex justify-center mt-[40px]">
            <p className="text-darkGreen text-[25px] font-Poppins">Orders</p>
          </div>

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
