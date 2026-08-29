"use client";
import { Drawer } from "antd";

const FilterModal = ({ openFilterModal, setOpenFilterModal }) => {
  const onClose = () => {
    setOpenFilterModal(false);
  };

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
      ></Drawer>
    </div>
  );
};

export default FilterModal;
