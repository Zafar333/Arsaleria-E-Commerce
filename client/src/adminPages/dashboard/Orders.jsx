"use client";
import { Image, Radio, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { toast } from "react-toastify";
import { Table } from "antd";
import { frontendDevelopmentBaseUrl } from "@/utils/api/main";
import { usePathname, useSearchParams } from "next/navigation";
const { Search } = Input;

const Orders = () => {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const [pageLoading, setPageLoading] = useState(false);
  const [manageOrdersFilter, setManageOrdersFilter] = useState(["allorders"]);
  const [orderAction, setorderAction] = useState(["pending"]);

    // for route changes useffect calling the fun mange page loading start here
    useEffect(() => {
      browserUrlChangePageloadingfun();
    }, [pathname]);
    // for route changes useffect calling the fun mange page end here

  // onSearch bar fun api is start from here
  const onSearch = async (value, _e, info) => {
    // try {
    //      if(!value){
    //   return
    // }
    //   setPageLoading(true);
    //   const response = await fetch(
    //     `${DevelopmentBaseUrl}${adminEndpoints?.getSearchFilterAllProducts}?name=${value}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //     },
    //   );
    //   const result = await response.json();
    //   if (result?.status >= 200 && result?.status < 400) {
    //     setPageLoading(false);
    //     return setAdminAllProducts(result?.data)
    //   }
    //   if (result?.status == 401) {
    //     setPageLoading(true);
    //     router.replace("/adminLogin");
    //     return toast.error(result?.message);
    //   }
    //   if (
    //     (result?.status >= 402 && result?.status <= 550) ||
    //     result?.status == 400
    //   ) {
    //     setAdminAllProducts([])
    //     setPageLoading(false);
    //     return toast.error(result?.message);
    //   }
    // } catch (error) {
    //   setPageLoading(false);
    //   // console.log(error?.message)
    //   return toast.error("server error");
    // }
  };
  // onSearch bar fun api is end here

  // getOrders fun is start from here
  const getOrders = async (val) => {
    setManageOrdersFilter([val]);
    if (val == "allorders") {
      //    return await adminGetAllProductsFunApi()
    }
    if (val == "pending") {
      //   return await getInStockProductsFunApi()
    }
    if (val == "completed") {
      //   return await getOutofStockProductsFunApi()
    }
    if (val == "cancelled") {
      //   return await getOutofStockProductsFunApi()
    }
  };
  // getOrders fun is end here

  // table data is start from here
  const handleStatusChange = (id, status) => {
  console.log("Order ID:", id);
  console.log("New Status:", status);
  setorderAction([status])

  
};

  const dataSource = [
    {
      key: "1",
      id:"1",
      name: "arslan",
      orderid: 32,
      product:<div className="flex items-center gap-3"><Image alt="images" src="https://res.cloudinary.com/tbf1ausw/image/upload/v1785165430/DairyFarmMedia/products/filefeed3fd7-81a2-4542-94ed-c88dc751cb5a/ssthhsmr5twmguo2ence.jpg" width={50} height={50}/> <span className="tex-[13px] font-Poppins">ghee</span></div>,
      price: "5456",
      payment: "cod",
      contact: "0302-6878646",
      status: orderAction,
      action:orderAction[0]
    },
    {
      key: "2",
      id:"2",
      name: "ali",
      orderid: 32,
      product:<div className="flex items-center gap-3"><Image alt="images" src="https://res.cloudinary.com/tbf1ausw/image/upload/v1785062665/DairyFarmMedia/products/filebda6a5cc-a5e9-4cb2-a5cb-ea2013303070/pnkt09nxvdd2uffrzbsn.jpg" width={50} height={50}/> <span className="tex-[13px] font-Poppins">yogurt</span></div>,
      price: "5456",
      payment: "cod",
      contact: "0302-6878646",
      status: "pending",
      action:orderAction[0]

    },
  ];
  const columns = [
     {
      title: "Order Id",
      width: 100,
      dataIndex: "orderid",
      fixed: "start",

    },
    {
      title: "Customer Name",
      width: 100,
      dataIndex: "name",
      fixed: "start",
    },
   
    {
      title: "Product Name",
      width: 100,
      dataIndex: "product",
    },
    {
      title: "Price",
      width: 100,
      dataIndex: "price",
    },
    {
      title: "Payment",
      width: 100,
      dataIndex: "payment",
    },
    {
      title: "Phone No",
      width: 100,
      dataIndex: "contact",
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "status",
     
    },
     {
      title: "Action",
      width: 100,
      dataIndex: "action",
      fixed:"end",
         render: (action, record) => (
      <Radio.Group className="flex! flex-col! gap-2! text-nowrap"
        value={action}
        onChange={(e) => handleStatusChange(record.id, e.target.value)}
      >
        <Radio className="text-[11px]! font-Poppins" value="pending">Pending</Radio>
        <Radio className="text-[11px]! font-Poppins" value="inProgress">In Progress</Radio>
        <Radio className="text-[11px]! font-Poppins" value="delivered">Delivered</Radio>
        <Radio className="text-[11px]! font-Poppins" value="cancelled">Cancelled</Radio>
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
              placeholder="search product with name"
              onSearch={onSearch}
              className="max-w-[300px]"
            />
          </div>
         {/* search filter is end here */}

          {/* filter section is start from here */}
          <div className="overflow-x-auto rounded-sm mt-[50px] flex items-center gap-4 py-[9px] sm:py-[5px] bg-lightGreen w-full sm:max-w-fit px-[50px]">
            <p
              className={`${manageOrdersFilter[0] == "allorders" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("allorders")}
            >
              All orders
            </p>
            <p
              className={`${manageOrdersFilter[0] == "pending" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
              onClick={() => getOrders("pending")}
            >
              Pending
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
          </div>
          {/* filter section is end here */}


          {/* table section is start from  */}
          <Table
            bordered
            className="mt-[50px] [&_.ant-table-tbody>tr>td]:text-[13px] [&_.ant-table-tbody>tr>td]:font-Poppins"
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
        // table section is end here
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Orders;
