"use client";

import {
  setCartDetailDispatch,
  setDispatchGrandTotal,
} from "@/store/cartDetailSlice.js";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Button,
  Form,
  Input,
  Radio,
  Select
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cartItemsData = useSelector(
    (state) => state.cartDetailSlice.cartdetail,
  );
  const navigate = useRouter();
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
  ]);
  const [payementMethod, setPaymentMethod] = useState(false);
  const [total, settotal] = useState([]);

  useEffect(() => {
    stopLoadingBar();
    dispatch(setCartDetailDispatch(cartItems));
    grandTotalFun();
    // console.log("i g")
  }, []);

  // form onfinish fun is start from here
  const onFinish = (values) => {
    console.log("Success:", values);
    if (values) {
      if (payementMethod == true) {
        if (!stripe || !elements) return;
        sendPaymentFun();
      }
      if (values) {
        if (payementMethod == false) {
          registerOrderFun();
        }
      }
    }
  };
  // form onfinish fun is end here

  // form onfinishfailed fun is start from  here

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("please fill all fields");
  };
  // form onfinishfailed fun is start from  here

  // GrandTotal Fun is start from here
  const grandTotalFun = () => {
    // console.log("fun")

    if (cartItemsData?.length > 0) {
      // console.log("in")
      let totalRupees = 0;
      cartItemsData.map((data, i) => {
        const total = data?.quantity * Number(data?.productPrice);
        totalRupees += total;
      });
      let grandtotal = totalRupees + Number(cartItemsData[0]?.deliveryCharges);
      dispatch(setDispatchGrandTotal(grandtotal));
      settotal([grandtotal]);

      return grandtotal;
    } else {
      // console.log("else ")

      return 0;
    }
  };
  // GrandTotal Fun is end here

  // deleteShoppingCartFun is start from here
  const deleteShoppingCartFun = (indx) => {
    console.log("index", indx);
    // let data=cartItems.splice(indx,1)
    let data = cartItemsData?.filter((item, ind) => ind != indx);
    // console.log("cartitems",data)
    dispatch(setCartDetailDispatch(data));
  };
  // deleteShoppingCartFun is end here

  // minusOrderQuantityFun is start from here
  const minusOrderQuantityFun = (itemData, ind) => {
    // console.log("item",itemData,ind)
    if (itemData?.quantity > 1) {
      const temp = cartItemsData?.map((data, i) =>
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
    const temp = cartItemsData?.map((data, i) =>
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

  // checkPaymentMethodFun is start from here
  const checkPaymentMethodFun = (e) => {
    console.log("helllo payment", e.target.value);
    if (e.target.value == "Cash On Delivery") {
      setPaymentMethod(false);
    }
    if (e.target.value == "online card") {
      setPaymentMethod(true);
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
  const registerOrderFun = () => {
    toast.success("order is register sucessfully");
  };
  // registerOrderFun is end here

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
                {cartItemsData?.length > 0
                  ? cartItemsData[0]?.deliveryCharges
                  : 0}{" "}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-Poppins text-[14px] sm-text-[16px] text-lightGreen">
                GrandTotal{" "}
              </p>
              <p className="font-Poppins text-[14px] sm-text-[16px] text-lightGreen">
                {total}{" "}
              </p>
            </div>
          </div>
        </div>
        {/* order summmary section is end here */}
        {/* <div className='h-[500px] overflow-auto'> */}
        {cartItemsData?.length > 0 ? (
          cartItemsData?.map((item, ind) => (
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
                      {item?.title}
                    </p>
                  </div>
                  <div className="flex gap-[25px] items-center mt-[10px]">
                    <div className="flex max-w-[80px]">
                      <Button
                        className="w-[10px] p-2 rounded-none text-[18px] font-bold"
                        onClick={() => minusOrderQuantityFun(item, ind)}
                      >
                        -
                      </Button>
                      <p className="rounded-none w-[60px] bg-white border border-gray-300 text-[16px] flex items-center justify-center">
                        {item?.quantity}
                      </p>
                      <Button
                        className="w-[10px] p-2 rounded-none text-[18px] font-bold "
                        onClick={() => plusOrderQuantityFun(item, ind)}
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
                <div className="flex flex-col gap-[8px]">
                  <div className="flex justify-between">
                    <label className="font-Poppins text-[16px]">Price</label>
                    <label className="font-Poppins text-[16px]">
                      {item?.productPrice}
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <label className="font-Poppins text-[16px]">Quantity</label>
                    <label className="font-Poppins text-[16px]">
                      {item?.quantity}
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <label className="font-Poppins text-[16px]">Total</label>
                    <label className="font-Poppins text-[16px]">
                      {Number(item?.productPrice * item?.quantity)}
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
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "please select your country!",
                },
              ]}
            >
              <Select placeholder="country">
                <Select.Option value="pakistan">Pakistan</Select.Option>
              </Select>
            </Form.Item>
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
          </div>

          <div className="grid grid-cols-2 gap-[30px]">
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

            <Form.Item
              label="Shipping"
              name="standardShipping"
              initialValue={"Standard Shipping"}
              rules={[
                {
                  required: true,
                  message: "Please enter your shipping method!",
                },
              ]}
            >
              <Input placeholder="Standard Shipping" />
            </Form.Item>
          </div>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address!",
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            //  initialValue={cashOndelivery}
            rules={[
              {
                required: true,
                message: "Please enter your payment method!",
              },
            ]}
          >
            <Radio.Group>
              <Radio onChange={checkPaymentMethodFun} value="Cash On Delivery">
                Cash On Delivery{" "}
              </Radio>
              <Radio onChange={checkPaymentMethodFun} value="online card">
                Debit or Credit Card{" "}
              </Radio>
            </Radio.Group>
          </Form.Item>

          {/* debit card detail form is start */}
          {payementMethod == true ? (
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
            <Button type="primary" htmlType="submit">
              Complete Order
            </Button>
          </div>
        </Form>
      </div>

      {/* delivery Order form is end here */}
    </div>
  );
};

export default CheckoutPage;
