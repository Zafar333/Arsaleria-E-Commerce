"use client";
import UserLogin from "@/components/userLoginModal/UserLogin";
import { setAddToCartModalDispatch } from "@/store/cartDetailSlice";
import { setUserLoginDetailDispatch } from "@/store/userLoginDetailSlice";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { Button, Dropdown } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { CgMenuRightAlt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddToCartModal from "../addToCartModal/AddToCartModal";
import UserSignup from "../userSignupModal/UserSignup";

// export const dispatchUserLoginDetailReduxFun = (data) => {
//   const dispatch = useDispatch();

//   dispatch(setUserLoginDetailDispatch(data));
// };
const Header = ({ token }) => {
  const { data: session, status } = useSession();
  const adminLoginDetailState = useSelector((state) => state?.adminDetailSlice);
  const userLoginDetailState = useSelector(
    (state) => state?.userLoginDetailSlice,
  );
  const dispatch = useDispatch();
  const navigate = useRouter();
  const path = usePathname();
  const AddToCartModalState = useSelector(
    (state) => state.cartDetailSlice.AddToCartModal,
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [headerHighlighter, setHeaderHighlighter] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const items = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  // set user signinwithgoogle login detail in reduxtoolkit after login is start here

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     console.log("my session", session);
  //     // dispatch(setUserLoginDetailDispatch({}));
  //   }
  // }, [session, status, dispatch]);

  // set user signinwithgoogle login detail in reduxtoolkit after login is end here

  useEffect(() => {
    stopLoadingBar();
  }, []);
  useEffect(() => {
    setHeaderHighlighter([path]);
  }, [path]);

  useEffect(() => {
    if (isSignUpModalOpen == true) {
      stopLoadingBar();
    }
  }, [isSignUpModalOpen]);

  const openSideBar = () => {
    if (sidebar == true) {
      setSidebar(false);
    }
    if (sidebar == false) {
      setSidebar(true);
    }
  };

  // openLoginModal fun is start from here
  // const openLoginModal = () => {
  //   if (isLoginModalOpen == false) {
  //     setIsLoginModalOpen(true);
  //   }
  // };
  // openLoginModal fun is end here

  // gotoLoginPage fun is satrt from here
  const gotoLoginPageFun = () => {
    startLoadingBar();
    navigate.replace(`/userLogin`);
  };
  // gotoLoginPage fun is end here

  // navigateFun is start from here
  const navigateFun = () => {
    startLoadingBar();
    setHeaderHighlighter([path]);
  };
  // navigateFun is end here

  // gotToContactUs fun is start from here
  const gotToContactUs = (data) => {
    startLoadingBar();
    navigate.push("/contactus");
    setHeaderHighlighter([path]);
  };
  // gotToContactUs fun is end here

  // gotToAdmin fun is start from here
  const gotToAdmin = () => {
    startLoadingBar();
    navigate.push(
      `/admin?id=${adminLoginDetailState?.adminLoginDetail[0]?.id}`,
    );
    setHeaderHighlighter([path]);
  };
  // gotToAdmin fun is end

  // openAddToCartModal Fun is start from here
  const openAddToCartModal = () => {
    // console.log("Add to cart Modal");
    startLoadingBar();
    dispatch(setAddToCartModalDispatch(true));
  };
  // openAddToCartModal Fun is end here

  // handleProfileClick fun is start from here
  const handleProfileClick = ({ key }) => {
    if (key == "logout") {
      userLogoutFun();
      // Call your logout API here
    }
  };
  // handleProfileClick fun is end here

  // userLogoutFun is start from here
  const userLogoutFun = async () => {
    // console.log("i", userLoginDetailState);
    try {
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.logout}?userLogout=logout&id=${userLoginDetailState?.userLoginDetail[0]?.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        toast.success(result?.message);
        dispatch(setUserLoginDetailDispatch([]));
        stopLoadingBar();
        return navigate.replace(`${frontendDevelopmentBaseUrl}/`);
      }

      if (result?.status >= 400 && result?.status <= 550) {
        stopLoadingBar();
        return toast.error(result?.message);
      }
    } catch (error) {
      stopLoadingBar();
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  // userLogoutFun is end here

  return (
    <div>
      <div className=" w-full h-[100px] m-auto bg-lightGreen">
        <div className="h-full flex items-center justify-between md:pl-0 pl-[20px] md:pr-0 pr-[20px] md:justify-around ">
          <p className=" text-[16px] xs:text-[18px] lg:text-[20px] xl:text-[25px] font-Elephant text-darkGreen">
            WhiteGold Dairy
          </p>
          {/* <div className="pl-[100px]"><img  className="text-[40px] font-Elephant text-darkGreen h-[100px] "  src={"./Fashion Fusion (1).png"}/></div> */}
          {/* for webView Menu Options is start from here */}
          <div className="hidden md:flex gap-[30px] xl:gap-[50px] items-center">
            <Link
              href={`/`}
              className={`${headerHighlighter[0] == "/" ? "border-b-2 border-darkGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen`}
              onClick={navigateFun}
            >
              Home{" "}
            </Link>
            <Link
              href={`/allProducts?limit=1&cursor=null`}
              className={`${headerHighlighter[0] == "/allProducts" ? "border-b-2 border-darkGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen`}
              onClick={navigateFun}
            >
              All Products{" "}
            </Link>

            <label
              className={`${headerHighlighter[0] == "/contactus" ? "border-b-2 border-darkGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen cursor-pointer`}
              onClick={gotToContactUs}
            >
              Contact Us{" "}
            </label>
            <label
              className={`${headerHighlighter[0] == "/admin" ? "border-b-2 border-darkGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen cursor-pointer`}
              onClick={gotToAdmin}
            >
              Admin
            </label>
            <BsCart3
              className="text-[25px] text-darkGreen cursor-pointer"
              onClick={openAddToCartModal}
            />
            {userLoginDetailState &&
            userLoginDetailState?.userLoginDetail?.length > 0 &&
            userLoginDetailState?.userLoginDetail[0]?.useraccessToken ? (
              <div>
                <Dropdown
                  menu={{ items, onClick: handleProfileClick }}
                  trigger={["click"]}
                >
                  <div className="cursor-pointer rounded-full h-[30px] min-w-[30px] md:h-[50px] md:min-w-[50px] flex items-center justify-center bg-darkGreen">
                    <p className="text-[14px] md:text-[22px] text-lightGreen font-Poppins">
                      {userLoginDetailState?.userLoginDetail[0]?.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </p>
                  </div>
                  {/* <Avatar
                    icon={<UserOutlined />}
                    style={{ cursor: "pointer" }}
                  /> */}
                </Dropdown>
              </div>
            ) : (
              <Button
                className="!text-[20px] !p-[20px] !text-darkGreen !font-Poppins !bg-lightGreen border !border-darkGreen"
                onClick={gotoLoginPageFun}
              >
                Login
              </Button>
            )}
          </div>
          {/* for webView Menu Options is end here */}

          {/* for mobile view menu options is start from here */}

          {/* mobile view menu icon is start from here */}
          <div className="flex items-center gap-[10px] xs:gap-[20px] md:hidden">
            <BsCart3
              className="cursor-pointer text-[20px] xs:text-[23px] text-darkGreen cursor-pointer"
              onClick={openAddToCartModal}
            />
            <CgMenuRightAlt
              onClick={openSideBar}
              className="cursor-pointer text-[24px] xs:text-[30px] text-darkGreen"
            />
          </div>

          {/* mobile view menu icon is end here */}
        </div>
      </div>
      {/* for mobile view menu options */}
      <div
        className={`${sidebar == true ? "block" : "hidden"} bg-darkGreen h-fit py-[20px]`}
      >
        <div className="flex flex-col md:hidden gap-[20px] items-center  ">
          <Link
            href={`/`}
            className={`${headerHighlighter[0] == "/" ? "border-b-2 border-lightGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen`}
            onClick={navigateFun}
          >
            Home{" "}
          </Link>
          <Link
            href={`/allProducts?limit=1&cursor=null`}
            className={`${headerHighlighter[0] == "/allProducts" ? "border-b-2 border-lightGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen`}
            onClick={navigateFun}
          >
            All Products{" "}
          </Link>

          <label
            className={`${headerHighlighter[0] == "/contactus" ? "border-b-2 border-lightGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen cursor-pointer`}
            onClick={gotToContactUs}
          >
            Contact Us{" "}
          </label>
          <label
            className={`${headerHighlighter[0] == "/admin" ? "border-b-2 border-lightGreen" : ""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen cursor-pointer`}
            onClick={gotToAdmin}
          >
            Admin
          </label>

          {userLoginDetailState &&
          userLoginDetailState?.userLoginDetail?.length > 0 &&
          userLoginDetailState?.userLoginDetail[0]?.useraccessToken ? (
            <Button
              className="text-[14px]! py-[14px]! px-[18px]! text-darkGreen! font-Poppins! bg-lightGreen! "
              onClick={userLogoutFun}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="text-[14px]! py-[14px]! px-[18px]! text-darkGreen! font-Poppins! bg-lightGreen! "
              onClick={gotoLoginPageFun}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      {/* for mobile view menu options is end here */}

      <UserLogin
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
      />
      <UserSignup
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />

      {/* AddToCartModal is start from here */}
      {AddToCartModalState == true ? <AddToCartModal /> : null}
      {/* AddToCartModal is end here */}
    </div>
  );
};

export default Header;
