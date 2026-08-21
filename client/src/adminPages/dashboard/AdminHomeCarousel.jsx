"use client";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const { Dragger } = Upload;

const AdminHomeCarousel = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [temporaryUploadeFiles, setTemporaryUploadeFiles] = useState([]);

  const [btnLoader, setBtnLoader] = useState(false);
  const [totalSelectedFiles, setTotalSelectedFiles] = useState([]);

  // deleteProductFunApi is start from here
  const deleteProductFunApi = async (prodId, mediaAsset_folder) => {
    // console.log("prdouctid",prodId)
    // console.log("assetfolder",mediaAsset_folder)
    try {
      setPageLoading(true);
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminDeleteHomeCarouselImg}?productid=${prodId}&mediaid=${mediaAsset_folder}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        stopLoadingBar();
        toast.success(result?.message);
        // return await adminGetAllProductsFunApi();
        // setPageLoading(false);
        // setAdminAllProducts(result?.data)
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        stopLoadingBar();

        setPageLoading(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      stopLoadingBar();

      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };
  // deleteProductFunApi is end here

  // handleBeforeUpload fun is start from here
  const handleBeforeUpload = (file) => {
    if (totalSelectedFiles?.length == 1) {
      message.warning(
        `You can upload a maximum of ${totalSelectedFiles?.length} files.`,
      );
      return Upload.LIST_IGNORE;
    }

    return false;
  };
  // handleBeforeUpload fun is start from here
  // handleChangeFiles fun onchange is start from here
  const handleChangeFiles = ({ fileList }) => {
    if (totalSelectedFiles?.length == 1) {
      return;
    }
    // console.log("handle")
    setTotalSelectedFiles(fileList);
  };

  // handleChangeFiles fun onchange is start from here
  useEffect(() => {
    console.log("total selected files", totalSelectedFiles);
  }, [totalSelectedFiles]);

  // Send backendGeneratePresignedSignatureCloudinaryFun request to backend create a digital signature of cloudinary start here
  const backendGeneratePresignedSignatureCloudinaryFun = async () => {
    try {
      const res = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminGenetatePreSignedSignatureHomeCarouselImg}`,
        {
          method: "GET",
          credentials: "include", // Send cookies with the request
        },
      );
      const data = await res.json();
      return data;
      // console.log("data", data);
    } catch (error) {
      setBtnLoader(false);
      setPageLoading(false);

      stopLoadingBar();
      toast.error("server error");
    }
  };
  // Send backendGeneratePresignedSignatureCloudinaryFun request to backend create a digital signature of cloudinary end here

  // delete fun for half uploaded files from frontend oncloud server so that
  // function delete files from cloud start here
  const deleteHalfUploadedProductFileClodinaryFun = async (data) => {
    try {
      const res = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminDeleteHalfFailFileHomeCarouselFromCloudinary}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            assets: data,
          }),
        },
      );

      const result = await res.json();
      if (result?.status >= 200 && result?.status < 400) {
        return result?.success;
      }

      if (result?.status >= 400 && result?.status <= 550) {
        // toast.error(result?.message)

        return result?.success;
      }
    } catch (error) {
      setBtnLoader(false);
      stopLoadingBar();
      // console.log("error",error?.message)
      toast.error("server error");
    }
  };

  // delete fun for half uploaded files from frontend oncloud server so that
  // function delete files from cloud end here
  // uploadImageFunApi is start from here
  const uploadImageFunApi = async () => {
    try {
      if (totalSelectedFiles?.length > 0) {
        setBtnLoader(true);
        setPageLoading(true);
        startLoadingBar();
        // Send request to backend create a digital signature of cloudinary start here
        const checkData =
          await backendGeneratePresignedSignatureCloudinaryFun();

        // Send request to backend create a digital signature of cloudinary end here

        if (checkData?.status >= 200 && checkData?.status < 400) {
          console.log("checkData", checkData);
          setBtnLoader(false);

          // upload images on cloudinary section start from here

          formData.append("file", totalSelectedFiles[0]?.originFileObj);
          formData.append("api_key", checkData?.apiKey);
          formData.append("timestamp", checkData?.timestamp);
          formData.append("signature", checkData?.signature);
          formData.append("folder", checkData?.folder);

          // Send request to cloud cloudinary storage save images and video on cloud api start here

          const response = await fetch(
            `${process.env.CLOUDINARY_SERVER_DOMAIN_URL}/${checkData?.cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            },
          );
          // Send request to cloud cloudinary storage save images and video on cloud api end here
          console.log("cloud response", response);
          if (!response?.ok) {
            if (temporaryUploadeFiles?.length > 0) {
              const check = await deleteHalfUploadedProductFileClodinaryFun(
                temporaryUploadeFiles,
              );
              // return console.log("check",check)
              if (check == "true") {
                setTemporaryUploadeFiles([]);
                stopLoadingBar();
                setBtnLoader(false);
                return toast.error("server error please upload images again");
              }
              if (check == "false") {
                setTemporaryUploadeFiles([]);
                stopLoadingBar();
                setBtnLoader(false);
                return toast.error("server error please upload images again");
              }
            }
            setTemporaryUploadeFiles([]);
            stopLoadingBar();
            setBtnLoader(false);
            return toast.error("server error please upload product again");
          }

          const content = await response?.json();
          // console.log("content", content);
          if (response?.ok) {
            temporaryUploadeFiles?.push({
              original_filename: content?.original_filename,
              public_id: content?.public_id,
              secure_url: content?.secure_url,
              resource_type: content?.resource_type,
              asset_folder: content?.asset_folder,
              format: content?.format,
            });
          }

          // upload images on cloudinary section is end here

          // return await adminGetAllProductsFunApi();
        }
        if (checkData?.status == 401) {
          setBtnLoader(false);

          setPageLoading(true);
          router.replace("/adminLogin");
          return toast.error(result?.message);
        }
        if (
          (checkData?.status >= 402 && checkData?.status <= 550) ||
          checkData?.status == 400
        ) {
          setBtnLoader(false);

          stopLoadingBar();

          setPageLoading(false);
          return toast.error(result?.message);
        }
      } else {
        toast.error("please select image");
      }
    } catch (error) {
      stopLoadingBar();
      setBtnLoader(false);

      setPageLoading(false);
      // console.log(error?.message)
      return toast.error("hello server error");
    }
  };
  // uploadImageFunApi is end here

  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mt-[30px]">
          <Dragger
            fileList={totalSelectedFiles}
            multiple
            maxCount={1}
            listType="picture"
            accept="image/*"
            beforeUpload={handleBeforeUpload}
            onChange={handleChangeFiles}
          >
            <p>
              <InboxOutlined style={{ fontSize: 40 }} />
            </p>

            <p className="font-Poppins text-red-600">
              Click here Upload Images
            </p>

            <p className="font-Poppins">Maximum 1 image</p>

            <p className="font-Poppins text-blue-600 font-bold">
              Selected: {totalSelectedFiles?.length}/1
            </p>
          </Dragger>{" "}
          {btnLoader == false ? (
            <Button
              className="w-full bg-darkGreen! text-lightGreen! text-[16px]! mt-[10px]"
              onClick={uploadImageFunApi}
            >
              Save
            </Button>
          ) : (
            <Button
              loading
              size="large"
              className="w-full! bg-darkGreen! text-lightGreen! text-[16px]! mt-[10px]"
            ></Button>
          )}
        </div>
        <div className="mt-[50px] md:mt-[60px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[60px] md:gap-[20px] lg:gap-[40px]">
          {/* card */}
          {/* loop is apply this div */}
          {/* {adminAllProducts?.length > 0 ? (
              adminAllProducts?.map((prod, ind) => ( */}
          <Link
            // key={ind}
            href={""}
            className="cursor-pointer border border-gray-200 rounded-sm"
          >
            <div className=" bg-whiteGray h-[300px] rounded-sm">
              <Image
                alt="Image"
                width={310}
                height={200}
                src={"/2.webp"}
                // src={prod?.media[0]?.secure_url}
                className="w-full h-full object-contain "
              />
            </div>
            {/* card text Content */}
            <div className="mt-[10px]">
              <p className="flex justify-center items-center">
                {/* {datavalue} */}
                {/* <label className="font-Poppins text-[18px] text-center text-darkGray bolder font-bold">
                  Delete
                </label> */}
                <MdDeleteOutline
                  className="text-red-600! text-[20px]! cursor-pointer mb-2 "
                  // onClick={() =>
                  //   deleteProductFunApi(prod?.id, prod?.media[0]?.asset_folder)
                  // }
                />
                {/* {prod?.product_name} */}
              </p>
            </div>
          </Link>
          {/* )) */}
          {/* ) : ( */}
          <div className="flex justify-center items-center max-w-[1400px]  ">
            <p className="text-[18px] font-Poppins text-darkGreen">
              No product found
            </p>
          </div>
          {/* )} */}

          {/* card text Content */}
          {/* loop is apply this div */}
          {/* {card} */}
        </div>
      </div>
    </div>
  );
};

export default AdminHomeCarousel;
