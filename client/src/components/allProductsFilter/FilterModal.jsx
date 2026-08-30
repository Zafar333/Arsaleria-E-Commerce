"use client";
import { DownOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Drawer, Tree } from "antd";
import { useEffect, useState } from "react";

const FilterModal = ({
  openFilterModal,
  setOpenFilterModal,
  allCategoriesData,
}) => {
  const [treeData, setTreeData] = useState([]);
  const onClose = () => {
    setOpenFilterModal(false);
  };

  useEffect(() => {
    setTreeData(arrangeCategorisFun());
  }, []);
  useEffect(() => {
    console.log("data", treeData);
  }, [treeData]);

  const arrangeCategorisFun = () => {
    const categories = allCategoriesData || [];

    const createTree = (parentId = null) => {
      return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => {
          const children = createTree(category.id);

          return {
            title: category?.category_name,
            parentid: category?.parent_id,
            isparent: category?.is_parent,
            key: category.id,

            ...(children.length > 0 && {
              children: children,
            }),
          };
        });
    };

    return createTree();
  };

  const tree = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "leaf",
          key: "0-0-0",
          icon: ({ selected }) =>
            selected ? <MinusOutlined /> : <PlusOutlined />,
        },
        {
          title: "leaf",
          key: "0-0-1",
          icon: ({ selected }) =>
            selected ? <MinusOutlined /> : <PlusOutlined />,
        },
      ],
    },
  ];

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
          // defaultExpandAll
          // defaultSelectedKeys={["0-0-0"]}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      </Drawer>
    </div>
  );
};

export default FilterModal;
