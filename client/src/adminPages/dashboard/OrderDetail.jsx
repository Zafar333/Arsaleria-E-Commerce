"use client";

import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { Table } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const router = useRouter();
  const param = useParams();

  const [OrderDetailData, setOrderDetailData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    stopLoadingBar();
    adminGetSingleOrderDetailFunApi();
  }, []);
  useEffect(() => {
    if (orderData?.length > 0) {
      addKeysOrderDataFun();
    } else {
      setOrderDetailData([]);
    }
  }, [orderData]);

  // addKeysOrderDataFun is start from here
  const addKeysOrderDataFun = () => {
    const newdata = orderData.map((data) => ({ ...data, key: data?.id }));
    setOrderDetailData(newdata);
  };

  // addKeysAllorderDataFun is end here

  // adminGetAllOrdersFunApi is start from here
  const adminGetSingleOrderDetailFunApi = async (ord) => {
    try {
      startLoadingBar();
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminGetSpecificOrderDetail}/${param?.id}`,
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
        return setOrderData(result?.data);
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

  const columns = [
    {
      title: "No",
      width: 100,
      dataIndex: "id",
      fixed: "start",
    },
    {
      title: "Order Id",
      width: 100,
      dataIndex: "order_id",
      fixed: "start",
    },

    {
      title: "Product Name",
      width: 100,
      dataIndex: "product_name",
      fixed: "start",
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record?.image_url}
            alt={name}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "6px" }}
          />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Product Price",
      width: 100,
      dataIndex: "sellproduct_price",
    },
    {
      title: "Weight",
      width: 100,
      dataIndex: "size",
    },
    {
      title: "Unit",
      width: 100,
      dataIndex: "unit",
    },
    {
      title: "Quantity",
      width: 100,
      dataIndex: "buy_quantity",
    },
  ];

  // totalPriceFun is start from here
  const totalPriceFun = () => {
    let sum = 0;
    OrderDetailData.map((data) => (sum = +data?.sellproduct_price));
    let delCharges = Number(OrderDetailData[0]?.delivery_charges);
    let data = sum + delCharges;
    return data;
  };
  // totalPriceFun is end from here

  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px] ">
      <div className="max-w-[1400px] mx-auto ">
        <div>
          <div className="flex justify-center mt-[40px]">
            <p className="text-darkGreen text-[20px] md:text-[25px] font-Poppins">
              Order Detail
            </p>
          </div>
          <div className="flex gap-3 mt-[30px]">
            <label className="text-darkGreen text-[16px] md:text-[22px]">
              Total Price:
            </label>
            <label className="text-darkGreen text-[16px] md:text-[22px]">
              {/* {totalPriceFun()} */}
            </label>
          </div>

          <Table
            bordered
            className="mt-[10px] [&_.ant-table-tbody>tr>td]:text-[13px] [&_.ant-table-tbody>tr>td]:font-Poppins"
            columns={columns}
            dataSource={OrderDetailData}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
