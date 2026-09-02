"use client";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Drawer, Tree } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./filterModal.css";

const FilterModal = ({
  openFilterModal,
  setOpenFilterModal,
  allCategoriesData,
  queryParams,
}) => {
  const router = useRouter();
  const [treeData, setTreeData] = useState([]);
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
        .filter((category) => category.parent_id === parentId)
        .map((category) => {
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

  // addCheckboxToBottomCategories fun is start from here
  const addCheckboxToBottomCategories = (categories) => {
    return categories.map((category) => {
      // If category has children
      if (category.children?.length > 0) {
        return {
          ...category,
          children: addCheckboxToBottomCategories(category.children),
        };
      }

      // Bottom category / leaf category
      return {
        ...category,
        title: (
          <Checkbox
            // checked={}

            onChange={(e) => {
              setDynamicUrlFun(
                category?.title,
                category?.key,
                e.target.checked,
              );
            }}
          >
            {category.title}
          </Checkbox>
        ),
      };
    });
  };
  // addCheckboxToBottomCategories fun is end here

  // setDynamicUrlFun is start from here
  const setDynamicUrlFun = (title, catgId, checked) => {
    const query = new URLSearchParams(window.location.search);
    if (checked == true) {
      router.replace(`?${query.toString()}&${title}=${catgId}`);
    }
    if (checked == false) {
      query.delete(title, catgId);
      router.replace(`?${query.toString()}`);
    }
  };
  // setDynamicUrlFun is end here

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
        <Tree
          showIcon
          defaultExpandAll
          // defaultSelectedKeys={["0-0-0"]}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      </Drawer>
    </div>
  );
};

export default FilterModal;
