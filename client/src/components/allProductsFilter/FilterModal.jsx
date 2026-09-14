"use client";
import {
  setAddProductsDispatch,
  setAllProductsDispatch,
  setInfiniteScrollingCursorDataDispatch,
} from "@/store/allProductsPageSlice";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Drawer, Tree } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./filterModal.css";

const FilterModal = ({
  openFilterModal,
  setOpenFilterModal,
  allCategoriesData,
  queryParams,
}) => {
  const reduxCursorData = useSelector(
    (state) => state?.allProductsSlice,
  )?.infiniteScrollingCursorData;
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const [treeData, setTreeData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onClose = () => {
    setOpenFilterModal(false);
  };

  useEffect(() => {
    const data = arrangeCategorisFun();
    if (data) {
      setTreeData(addCheckboxToBottomCategories(data));
    }
  }, []);

  // arrangeCategorisFun is start from here
  const arrangeCategorisFun = () => {
    const categories = allCategoriesData || [];

    const createTree = (parentId = null) => {
      return categories
        ?.filter((category) => category?.parent_id === parentId)
        ?.map((category) => {
          const children = createTree(category?.id);

          return {
            title: category?.category_name,
            parentid: category?.parent_id,
            isparent: category?.is_parent,
            key: category?.id,
            ...(children?.length > 0 && {
              children: children,
            }),
          };
        });
    };

    return createTree();
  };
  // arrangeCategorisFun is end here
  // setDynamicUrlFun is start from here
  const setDynamicUrlFun = (title, catgId, checked) => {
    // console.log("catgid", typeof catgId);
    const query = new URLSearchParams(window.location.search);
    if (checked == true) {
      dispatch(setAllProductsDispatch([]));
      dispatch(setAddProductsDispatch([]));
      query?.delete("cursor");

      setSelectedCategories((prev) => [...prev, catgId]);
      router.replace(`?${query?.toString()}&cursor=null&${title}=${catgId}`);
      startLoadingBar();
    }

    if (checked == false) {
      dispatch(setAllProductsDispatch([]));
      dispatch(setAddProductsDispatch([]));
      setSelectedCategories(
        selectedCategories.filter((data) => data != catgId),
      );
      query?.delete("cursor");
      query?.delete(title, catgId);
      router.replace(`?${query.toString()}&cursor=null`);
      startLoadingBar();
    }
  };
  // setDynamicUrlFun is end here

  // addCheckboxToBottomCategories fun is start from here
  const addCheckboxToBottomCategories = (categories) => {
    return categories?.map((category) => {
      // If category has children
      if (category?.children?.length > 0) {
        return {
          ...category,
          children: addCheckboxToBottomCategories(category?.children),
        };
      }

      // Bottom category / leaf category
      {
      }
      return {
        ...category,
        title: (
          <Checkbox
            className="text-darkGreen! text-[12px]! font-Poppins"
            onChange={(e) => {
              setDynamicUrlFun(
                category?.title,
                category?.key,
                e.target?.checked,
              );
            }}
          >
            {category?.title}
          </Checkbox>
        ),
      };
    });
  };
  // addCheckboxToBottomCategories fun is end here

  // clearAllfilterFun is start from here
  const clearAllfilterFun = () => {
    startLoadingBar();
    router.replace(`?limit=1&cursor=null`);
    let paginationCursorData = [{ nextCursor: null, hasMore: "false" }];
    setSelectedCategories([]);
    dispatch(setAllProductsDispatch([]));
    dispatch(setAddProductsDispatch([]));
    dispatch(setInfiniteScrollingCursorDataDispatch(paginationCursorData));
  };
  // clearAllfilterFun is end here

  return (
    <div>
      <Drawer
        title="Sidebar Menu"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openFilterModal}
        placement="left"
        styles={{
          body: {
            background: "",
            color: "",
          },
          header: {
            background: "#fff",
            color: "",
          },
        }}
        className={`bg-gray-200! p-0 m-0 `}
      >
        <div className="py-5  bg-white  h-full">
          <Tree
            showIcon
            defaultExpandAll
            titleRender={(node) => (
              <span className="text-darkGreen! text-[14px]! font-Poppins">
                {node.title}
              </span>
            )}
            defaultSelectedKeys={["0-0-0"]}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            className="bg-transparent! "
          />
          <div className=" mt-10">
            <Button
              onClick={clearAllfilterFun}
              className="bg-lightGreen! text-darkGreen text-[14px]! font-Poppins! ml-5  "
            >
              Clear all Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FilterModal;
