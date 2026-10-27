"use client";
import {
  setDispatchGrandTotalProductDetailSlice,
  setSelectedSizeProductDetailSliceDispatch,
} from "@/store/productDetailSlice";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Form, Input, Radio } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const BuyNowSingleProductComponent = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state) => state?.productDetailSlice?.selectedSizeProductDetail,
  );
  const userDetail = useSelector(
    (state) => state?.userProfileDetailSlice?.userProfileDetail,
  );
  const [btnLoader, setBtnLoader] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [payementMethod, setPaymentMethod] = useState("cashOnDelivery");
  const grandTotalState = useSelector(
    (state) => state?.productDetailSlice?.grandTotal,
  );
  const navigate = useRouter();
  // useEffect(() => {
  //   console.log("cartProducts", cartProducts);
  // }, [cartProducts]);

  useEffect(() => {
    stopLoadingBar();
  }, []);
  useEffect(() => {
    grandTotalFun();
  }, [cartProducts]);

  // form onfinishfailed fun is start from  here

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    return toast.error("please fill all fields");
  };
  // form onfinishfailed fun is start from  here

  // GrandTotal Fun is start from here
  const grandTotalFun = () => {
    // console.log("fun")

    if (cartProducts?.length > 0) {
      // console.log("in")
      let totalRupees = 0;
      cartProducts?.map((data) => {
        const total = data?.buyQuantity * Number(data?.price);
        totalRupees += total;
      });
      if (cartProducts[0]?.delivery_type == "paid") {
        let grandtotal =
          totalRupees + Number(cartProducts[0]?.delivery_charges);
        dispatch(setDispatchGrandTotalProductDetailSlice([grandtotal]));

        return grandtotal;
      }
      return dispatch(setDispatchGrandTotalProductDetailSlice([totalRupees]));
    } else {
      // console.log("else ")

      return dispatch(setDispatchGrandTotalProductDetailSlice([0]));
    }
  };
  // GrandTotal Fun is end here

  // deleteShoppingCartFun is start from here
  const deleteShoppingCartFun = (id) => {
    let data = cartProducts?.filter((item) => item?.productId != id);
    dispatch(setSelectedSizeProductDetailSliceDispatch(data));
  };
  // deleteShoppingCartFun is end here

  // minusOrderQuantityFun is start from here
  const minusOrderQuantityFun = (itemData, variantid) => {
    // console.log("item",itemData,ind)
    if (itemData?.buyQuantity > 1) {
      const temp = cartProducts?.filter(
        (data) => data?.productVariantId == variantid,
      );
      let newtemp = [{ ...temp[0], buyQuantity: temp[0]?.buyQuantity - 1 }];

      // setCartItems(temp)
      dispatch(setSelectedSizeProductDetailSliceDispatch(newtemp));
    }
  };
  // minusOrderQuantityFun is end here

  // plusOrderQuantityFun is start from here
  const plusOrderQuantityFun = (itemData, variantid) => {
    // console.log("item",itemData,ind)
    const temp = cartProducts?.filter(
      (data) => data?.productVariantId == variantid,
    );
    let newtemp = [{ ...temp[0], buyQuantity: temp[0]?.buyQuantity + 1 }];
    // setCartItems(temp)
    dispatch(setSelectedSizeProductDetailSliceDispatch(newtemp));
  };
  // plusOrderQuantityFun is end here

  // checkPaymentMethodFun is start from here
  const checkPaymentMethodFun = (e) => {
    // console.log("helllo payment", e.target.value);
    if (e.target.value == "cashOnDelivery") {
      // console.log("cashOnDelivery");
      return setPaymentMethod("cashOnDelivery");
    }
    if (e.target.value == "onlineCard") {
      // console.log("onlineCard");

      return setPaymentMethod("onlineCard");
    }
  };
  // checkPaymentMethodFun is end here

  // sendpaymentfun is start from here
  const sendPaymentFun = async () => {
    try {
      // 1. Get client secret from backend
      const data = await fetch(
        "http://localhost:5000/user/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1000 }),
        },
      );

      const res = await data.json();
      if (res?.status >= 300) {
        return toast.error(res?.message);
      }
      const { clientSecret } = res;

      // 2. Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );
      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("pay", paymentIntent);
        toast.success("Payment Successful 🎉");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  // sendpaymentfun is end from here

  // registerOrderFun is start from here
  const registerOrderFun = async (formValu) => {
    const data = {
      userId: userDetail[0]?.userId,
      cartProducts,
      grandTotalState,
      shippingDetails: formValu,
    };
    try {
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.userOrder}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
          cache: "no-store",
        },
      );

      // Handle successful response
      const result = await response.json();
      if (result?.status >= 200 && result?.status <= 300) {
        setBtnLoader(false);
        // form.resetFields(null);

        // console.log("logindata",result);

        return toast.success(result?.message);
      }
      if (result?.status == 401) {
        toast?.error(result?.message);
        return navigate.replace("/userLogin");
      }
      if (
        result?.status == 400 ||
        (result?.status > 401 && result?.status <= 550)
      ) {
        // stopLoadingBar();
        setBtnLoader(false);
        return toast?.error(result?.message);
      }
    } catch (error) {
      toast.error("server error");
    }
    toast.success("order is register sucessfully");
  };
  // registerOrderFun is end here

  // form onfinish fun is start from here
  const onFinish = (values) => {
    console.log("Success:", values);
    setBtnLoader(true);
    if (cartProducts?.length == 0) {
      setBtnLoader(false);

      return toast.error("please select product");
    }

    if (values) {
      if (payementMethod == "onlineCard") {
        console.log("payementMethod", payementMethod);
        if (!stripe || !elements) {
          return;
        }
        // sendPaymentFun();
      } else {
        if (payementMethod == "cashOnDelivery") {
          console.log("payementMethod", payementMethod);
          registerOrderFun(values);
        }
      }
    }
  };
  // form onfinish fun is end here

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 py-[30px] border border-black ">
      {/* checkout Product information  card is start from here */}

      <div className="flex flex-col">
        {/* order summmary section is start from here */}
        <div className="mx-[10px] sm-mx-[40px] flex flex-col gap-[10px] bg-darkGreen p-[10px] rounded-sm">
          <p className="font-Poppins text-[20px] text-lightGreen">
            Order Summary
          </p>
          <div className="flex flex-col gap-[5px] px-[20px]">
            <div className="flex justify-between">
              <p className="font-Poppins tex-[14px] sm-text-[16px] text-lightGreen">
                Delivery Charges{" "}
              </p>
              <p className="font-Poppins text-[14px] sm-text-[16px] text-lightGreen">
                {" "}
                {cartProducts?.length > 0 &&
                cartProducts[0]?.delivery_type == "paid"
                  ? cartProducts[0]?.delivery_charges
                  : 0}{" "}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-Poppins text-[14px] sm-text-[16px] text-lightGreen">
                GrandTotal{" "}
              </p>
              <p className="font-Poppins text-[14px] sm-text-[16px] text-lightGreen">
                {grandTotalState[0]}
              </p>
            </div>
          </div>
        </div>
        {/* order summmary section is end here */}
        {/* <div className='h-[500px] overflow-auto'> */}
        {cartProducts?.length > 0 ? (
          cartProducts?.map((item, ind) => (
            <div
              className="m-[10px] bg-lightGreen rounded-sm sm:m-[40px] p-[20px]"
              key={ind}
            >
              <div className="flex flex-col gap-[20px] ">
                <div>
                  <div className="flex gap-2">
                    <img
                      src={item?.img}
                      className="w-[70px] border border-darkGreen "
                    />
                    <p className="text-darkGreen font-Poppins text-[16px]">
                      {item?.product_name}
                    </p>
                  </div>
                  <div className="flex gap-[25px] items-center mt-[10px]">
                    <div className="flex max-w-[80px]">
                      <Button
                        className="w-[10px] p-2 rounded-none text-[18px] font-bold"
                        onClick={() =>
                          minusOrderQuantityFun(item, item?.productVariantId)
                        }
                      >
                        -
                      </Button>
                      <p className="rounded-none w-[60px] bg-white border border-gray-300 text-[16px] flex items-center justify-center">
                        {item?.buyQuantity}
                      </p>
                      <Button
                        className="w-[10px] p-2 rounded-none text-[18px] font-bold "
                        onClick={() =>
                          plusOrderQuantityFun(item, item?.productVariantId)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <AiTwotoneDelete
                      className="text-[24px] text-red-500 cursor-pointer"
                      onClick={() => deleteShoppingCartFun(item?.productId)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex justify-between">
                    <label className="font-Poppins text-[16px]">Price</label>
                    <label className="font-Poppins text-[16px]">
                      {item?.price}
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <label className="font-Poppins text-[16px]">Quantity</label>
                    <label className="font-Poppins text-[16px]">
                      {item?.buyQuantity}
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <label className="font-Poppins text-[16px]">Total</label>
                    <label className="font-Poppins text-[16px]">
                      {Number(item?.price * item?.buyQuantity)}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="font-Poppins text-[20px] text-center text-red-500 mt-[50px]">
            your Cart is empty
          </div>
        )}
      </div>
      {/* checkout Product information  card is end here */}
      {/* delivery Order form is start from here */}
      <div className="bg-white py-[30px] px-[10px] sm:p-[30px] rounded-sm h-fit">
        <p className="font-Poppins text-[22px] mb-[20px] text-darkGreen">
          Delivery Details
        </p>

        <Form
          className=""
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-[30px]">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Mobile"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Please enter your phoneNumber!",
                },
              ]}
            >
              <Input type="number" placeholder="phoneNumber" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-[30px]">
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please enter your city!",
                },
              ]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              label="PostalCode"
              name="postalcode"
              rules={[
                {
                  // required: true,
                  message: "Please enter your city!",
                },
              ]}
            >
              <Input placeholder="postal code / zipcode optional" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-[30px]"></div>
          <Form.Item
            label="Shipping Address"
            name="shippingAddress"
            rules={[
              {
                required: true,
                message: "Please enter your shipping address!",
              },
            ]}
          >
            <Input placeholder="enter your shipping Address" />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            initialValue={"cashOnDelivery"}
            name="paymentMethod"
            //  initialValue={cashOndelivery}
            rules={[
              {
                required: true,
                message: "Please enter your payment method!",
              },
            ]}
          >
            <Radio.Group
            // value={payementMethod}
            // onChange={(e) => checkPaymentMethodFun(e)}
            >
              <Radio
                onChange={(e) => checkPaymentMethodFun(e)}
                value="cashOnDelivery"
              >
                Cash On Delivery{" "}
              </Radio>
              <Radio
                onChange={(e) => checkPaymentMethodFun(e)}
                value="onlineCard"
              >
                Debit or Credit Card{" "}
              </Radio>
            </Radio.Group>
          </Form.Item>

          {/* debit card detail form is start */}
          {payementMethod == "onlineCard" ? (
            <div>
              <p className="font-Poppins text-[22px] mt-[28px] mb-[14px] text-darkGreen">
                Card Details
              </p>

              <Form.Item label="Card Details">
                <div style={{ padding: "10px", border: "1px solid #d9d9d9" }}>
                  <CardElement />
                </div>
              </Form.Item>
            </div>
          ) : null}
          {/* debit card detail form is end here */}

          <div className="flex justify-center">
            {btnLoader == false ? (
              <Button
                type="primary"
                htmlType="submit"
                className="w-[170px] py-[5px]! text-[14px] md:text-[16px]! font-Poppins bg-darkGreen! text-white!"
              >
                Complete Order
              </Button>
            ) : (
              <Button
                loading
                className="w-[170px]! bg-darkGreen! text-white! py-[5px]!"
              ></Button>
            )}
          </div>
        </Form>
      </div>
      {/* delivery Order form is end here */}
    </div>
  );
};

export default BuyNowSingleProductComponent;
