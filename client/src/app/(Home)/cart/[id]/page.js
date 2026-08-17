import CartPage from "@/websitePages/cartPage/CartPage";

const page = async () => {
  return (
    <>
      <div className="bg-[#f4f6f8] px-[10px] sm:px-[20px]">
        <CartPage />
      </div>
    </>
  );

  // call api fun is start from here send cookies token

  // const callapi=async()=>{

  // try{
  //       const cookieStore = cookies();

  //       // console.log("token",cookieStore)
  //   const response =  await fetch(
  //     `${DevelopmentBaseUrl}${userEndPoints.userCheckToken}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Cookie: cookieStore.toString(),
  //       },
  //       cache: "no-store",
  //     }
  //   );

  //   console.log("status", response.status);

  //   const data = await response.json();

  //     }catch(error){
  //       console.log("ha g err",error.message)
  //     }

  //   }
  //   callapi();

  // call api fun is end here send cookies token
};

export default page;
