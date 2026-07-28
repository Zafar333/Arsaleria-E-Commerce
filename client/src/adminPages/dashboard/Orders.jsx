"use client";
import { Radio, Spin } from "antd";
import React, { useState } from "react";
import { Input } from "antd";
import { toast } from "react-toastify";
import { Table } from "antd";
const { Search } = Input;

const Orders = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [manageOrdersFilter, setManageOrdersFilter] = useState(["allorders"]);
  const [orderAction, setorderAction] = useState(["Pending"]);

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

  // Call your PATCH API here
};

  const dataSource = [
    {
      key: "1",
      id:"1",
      name: "arslan",
      orderid: 32,
      product: "yogurttttttttttttttttttttttttttttttttttttttttttttt",
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
      product: "yogurt",
      price: "5456",
      payment: "cod",
      contact: "0302-6878646",
      status: "pending",
      action:orderAction[0]

    },
  ];
  const columns = [
    {
      title: "Customer Name",
      width: 100,
      dataIndex: "name",
      fixed: "start",
    },
    {
      title: "Order Id",
      width: 100,
      dataIndex: "orderid",
    },
    {
      title: "Product",
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
      <Radio.Group
        value={action}
        onChange={(e) => handleStatusChange(record.id, e.target.value)}
      >
        <Radio value="Pending">Pending</Radio>
        <Radio value="In Progress">In Progress</Radio>
        <Radio value="Delivered">Delivered</Radio>
      </Radio.Group>
    ),
    },
  ];

  // table data is end here
  //

  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px]">
      {pageLoading == false ? (
        <div className="max-w-[1400px] mx-auto">
          <div className="mt-[20px] flex justify-end">
            <Search
              placeholder="search product with name"
              onSearch={onSearch}
              className="max-w-[300px]"
            />
          </div>
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

          <Table
            bordered
            className="mt-[50px]"
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Orders;
