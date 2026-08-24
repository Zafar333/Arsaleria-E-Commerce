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
import { Input, Spin, Table } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
const { Search } = Input;

const AllUsers = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [allUsersData, setAllUsersData] = useState([]);
  const [manageUsersFilter, setManageUsersFilter] = useState([]);

  const searchparams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    getAllUsersFunApi();
  }, []);

  useEffect(() => {
    browserUrlChangePageloadingfun();
  }, [pathname]);

  //   getAllUsersFunApi fun is start from here
  const getAllUsersFunApi = async () => {
    try {
      startLoadingBar();
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.getAllUsersData}`,
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
        setAllUsersData(result?.data);
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
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  //   getAllUsersFunApi fun is end here

  // handleDeleteUser fun api is start from here
  const handleDeleteUser = async (userid) => {
    console.log("userid", userid);
    try {
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminDeleteUser}/${userid}`,
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
        setPageLoading(false);
        toast.success(result?.message);
        return getAllUsersFunApi();
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
  // handleDeleteUser fun api is end here

  const columns = [
    {
      title: "Customer Id",
      width: 100,
      dataIndex: "id",
      fixed: "start",
    },
    {
      title: "Customer Name",
      width: 100,
      dataIndex: "name",
      fixed: "start",
    },

    {
      title: "Email",
      width: 100,
      dataIndex: "email",
    },
    {
      title: "Registration Date",
      width: 100,
      dataIndex: "created_date",
    },

    {
      title: "Action",
      width: 100,
      // dataIndex: "action",
      render: (_, record) => (
        <MdDeleteOutline
          className="text-red-600 text-[17px]"
          onClick={() => handleDeleteUser(record.id)}
        />
      ),
      fixed: "end",
    },
  ];

  // browserUrlChangePageloadingfun is start from here
  const browserUrlChangePageloadingfun = () => {
    // console.log("pageloadinfun call")
    // console.log("pageloadinfun call",pathname)
    // console.log("pageloadinfun call",frontendDevelopmentBaseUrl)
    const queryparam = searchparams.getAll("id");
    // console.log("pageloadinfun call",queryparam[0])

    if (
      `${frontendDevelopmentBaseUrl}/admin/allUsers?id=${queryparam[0]}` ==
      `${frontendDevelopmentBaseUrl}${pathname}?id=${queryparam[0]}`
    ) {
      // console.log("inblock")
      return setPageLoading(false);
    } else {
      // console.log("elseblock")
      return setPageLoading(true);
    }
  };
  // browserUrlChangePageloadingfun is end here

  // onSearch bar fun api is start from here
  const onSearch = async (value, _e, info) => {
    try {
      if (!value) {
        return;
      }
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.getSearchUsersFilterData}?name=${value}`,
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
        return setAllUsersData(result?.data);
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

  // getProducts fun is start from here
  const getAllUsers = async (val) => {
    setManageUsersFilter([val]);
    if (val == "allusers") {
      return await getAllUsersFunApi();
    }
  };
  // getProducts fun is end here
  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px]">
      <div className="max-w-[1400px] mx-auto">
        {pageLoading == false ? (
          allUsersData?.length > 0 ? (
            <div>
              <div className="mt-[60px] flex justify-end">
                <Search
                  placeholder="search user with name"
                  onSearch={onSearch}
                  className="max-w-[300px]"
                />
              </div>

              <div className="overflow-x-auto rounded-sm mt-[50px] flex items-center gap-4 py-[9px] sm:py-[5px] bg-lightGreen w-full sm:max-w-fit px-[50px]">
                <p
                  className={`${manageUsersFilter[0] == "allusers" ? "bg-white rounded-sm" : ""} text-darkGreen text-[14px] px-2 my-1 cursor-pointer text-nowrap`}
                  onClick={() => getAllUsers("allusers")}
                >
                  All Users
                </p>
              </div>

              {/* table section is start from  */}

              <Table
                bordered
                className="mt-[50px] [&_.ant-table-tbody>tr>td]:text-[13px] [&_.ant-table-tbody>tr>td]:font-Poppins"
                columns={columns}
                dataSource={allUsersData}
                scroll={{ x: "max-content" }}
                pagination={false}
              />
              {/* // table section is end here */}
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <p className="text-[18px] font-Poppins">No Users found</p>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
