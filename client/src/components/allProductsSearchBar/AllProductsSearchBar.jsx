"use client";
import {
  setAddProductsDispatch,
  setAllProductsDispatch,
} from "@/store/allProductsPageSlice";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./allProductsSearchBar.css";
const { Search } = Input;

const AllProductsSearchBar = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  // searchBar function is startfrom here
  const onSearch = async (value) => {
    if (!value) {
      return toast.error("search bar is empty");
    }

    const query = new URLSearchParams(window.location.search);
    dispatch(setAllProductsDispatch([]));
    dispatch(setAddProductsDispatch([]));
    if (query?.has("cursor")) {
      query?.delete("cursor");
    }
    if (query?.has("search")) {
      query?.delete("search");
    }
    startLoadingBar();
    router.replace(`?${query?.toString()}&cursor=null&search=${value}`);
    form.resetFields();
    // form.resetFields(["search"]);
  };
  // searchBar function is end here

  return (
    <div className="mt-[50px] mb-[50px] text-right">
      <Form form={form}>
        <Form.Item
          name="search"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Search
            placeholder="Search products"
            onSearch={onSearch}
            className="w-full! sm:w-[400px]! rounded-sm font-Poppins!  "
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AllProductsSearchBar;
