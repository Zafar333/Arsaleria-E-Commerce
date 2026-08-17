"use client";
import {
  setAddToCartModalDispatch,
  setCartDetailDispatch,
  setDispatchGrandTotal,
} from "@/store/cartDetailSlice";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Button, Drawer, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const AddToCartModal = () => {
  const AddToCartModalState = useSelector(
    (state) => state.cartDetailSlice.AddToCartModal,
  );
  const dispatch = useDispatch();
  const navigate = useRouter();
  const cartData = useSelector((state) => state.cartDetailSlice.cartdetail);
  const tot = useSelector((state) => state.cartDetailSlice.grandTotal);

  const [cartItems, setCartItems] = useState([
    {
      img: "/cover1.svg",
      title: "shirt round neck",
      quantity: 1,
      productPrice: "1899",
      deliveryCharges: "200",
    },
    {
      img: "/cover1.svg",
      title: "shirt round neck",
      quantity: 1,
      productPrice: "1899",
      deliveryCharges: "200",
    },
    {
      img: "/cover1.svg",
      title: "shirt round neck",
      quantity: 1,
      productPrice: "1899",
      deliveryCharges: "200",
    },
    {
      img: "/cover1.svg",
      title: "shirt round neck",
      quantity: 1,
      productPrice: "1899",
      deliveryCharges: "200",
    },
    {
      img: "/cover1.svg",
      title: "shirt round neck",
      quantity: 1,
      productPrice: "1899",
      deliveryCharges: "200",
    },
  ]);
  const [total, settotal] = useState([]);
  useEffect(() => {
    dispatch(setCartDetailDispatch(cartItems));
    grandTotalFun();
  }, []);

  useEffect(() => {
    if (AddToCartModalState == true) {
      stopLoadingBar();
    }
  }, [AddToCartModalState]);

  // OpenAddToCartModal is startf from here
  const OpenAddToCartModal = () => {
    // navigate.push(`/cart/${2}`)
    dispatch(setAddToCartModalDispatch(true));
  };
  // OpenAddToCartModal is end here

  // close modal fun is start from here
  const onClose = () => {
    // setOpen(false);
    dispatch(setAddToCartModalDispatch(false));
  };
  // close modal fun is end here

  // deleteShoppingCartFun is start from here
  const deleteShoppingCartFun = (indx) => {
    console.log("index", indx);
    // let data=cartItems.splice(indx,1)
    let data = cartData?.filter((item, ind) => ind != indx);
    // console.log("cartitems",data)
    dispatch(setCartDetailDispatch(data));
  };
  // deleteShoppingCartFun is end here

  // minusOrderQuantityFun is start from here
  const minusOrderQuantityFun = (itemData, ind) => {
    // console.log("item",itemData,ind)
    if (itemData?.quantity > 1) {
      const temp = cartData?.map((data, i) =>
        i == ind
          ? {
              ...data,
              quantity: itemData.quantity - 1,
            }
          : data,
      );
      // setCartItems(temp)
      dispatch(setCartDetailDispatch(temp));
    }
  };
  // minusOrderQuantityFun is end here

  // plusOrderQuantityFun is start from here
  const plusOrderQuantityFun = (itemData, ind) => {
    // console.log("item",itemData,ind)
    const temp = cartData?.map((data, i) =>
      i == ind
        ? {
            ...data,
            quantity: itemData.quantity + 1,
          }
        : data,
    );
    // setCartItems(temp)
    dispatch(setCartDetailDispatch(temp));
  };
  // plusOrderQuantityFun is end here

  // GrandTotal Fun is start from here
  const grandTotalFun = () => {
    if (cartData?.length > 0) {
      let totalRupees = 0;
      {
        cartData.map((data, i) => {
          const total = data?.quantity * Number(data?.productPrice);
          totalRupees += total;
        });
        let grandtotal = totalRupees + Number(cartData[0]?.deliveryCharges);
        dispatch(setDispatchGrandTotal(grandtotal));
        console.log("fun call");
        settotal(grandtotal);
        return grandtotal;
      }
    } else {
      return 0;
    }
  };
  // GrandTotal Fun is end here

  //  gotoCartPageFun is start from here
  const gotoCartPageFun = () => {
    dispatch(setAddToCartModalDispatch(false));
    startLoadingBar();
    navigate.push("/cart/2");
  };
  //  gotoCartPageFun is end here

  return (
    // AddToCart Modal is start from here
    <Drawer
      onClose={onClose}
      title="Shopping Cart"
      className=""
      extra={
        <Space>
          <IoCloseSharp
            onClick={onClose}
            className=" text-darkGreen text-[25px] cursor-pointer "
          />
        </Space>
      }
      closeIcon={false}
      open={AddToCartModalState}
    >
      <div className="flex flex-col gap-[30px] ">
        {cartData?.length > 0 ? (
          cartData?.map((data, ind) => (
            <div
              className="py-[10px] px-[10px] border-2 border-lightGreen "
              key={ind}
            >
              <div className="flex gap-[5px]">
                <img
                  src={data?.img}
                  className="border-2 border-gray-300 max-w-[100px]"
                />
                <div className="flex flex-col gap-[5px]">
                  <p className="font-Poppins text-[16px]">{data?.title}</p>
                  <div className="flex gap-[10px]">
                    <p className="font-Poppins text-[18px]">Price</p>
                    <p className="font-Poppins text-[18px]">
                      {data?.productPrice}
                    </p>
                  </div>
                  <div className="flex gap-[25px] items-center mt-[10px]">
                    <div className="flex max-w-[80px]">
                      <Button
                        className="w-[10px] p-2 rounded-none text-[18px] font-bold"
                        onClick={() => minusOrderQuantityFun(data, ind)}
                      >
                        -
                      </Button>
                      <p className="rounded-none w-[60px] bg-white border border-gray-300 text-[16px] flex items-center justify-center">
                        {data?.quantity}
                      </p>
                      <Button
                        className="w-[10px] p-2 rounded-none text-[18px] font-bold "
                        onClick={() => plusOrderQuantityFun(data, ind)}
                      >
                        +
                      </Button>
                    </div>
                    <AiTwotoneDelete
                      className="text-[24px] text-red-500 cursor-pointer"
                      onClick={() => deleteShoppingCartFun(ind)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="font-Poppins text-[18px] text-red-600 text-center">
            Cart is empty !
          </p>
        )}

        <div className="w-full flex flex-col gap-[10px] bg-lightGreen px-[10px] py-[30px] absolute left-0 bottom-0 ">
          <div className="flex justify-between">
            <p className="font-Poppins text-[20px] text-darkGreen font-bold">
              SUBTOTAL:
            </p>
            <p className="font-Poppins text-[20px] text-darkGreen font-bold">
              {tot}
            </p>
          </div>
          <Button
            className="py-[20px] text-[18px] font-Poppins bg-darkGreen w-full text-lightGreen"
            onClick={gotoCartPageFun}
          >
            CHECKOUT
          </Button>
        </div>
      </div>
    </Drawer>
    // AddToCart Modal is end here
  );
};

export default AddToCartModal;
