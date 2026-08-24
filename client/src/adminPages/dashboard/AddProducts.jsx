"use client";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import "./addProducts.css";

import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { InboxOutlined, SaveOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const { Dragger } = Upload;
const { TextArea } = Input;

const AddProducts = () => {
  const router = useRouter();
  const [allBottomCategories, setAllBottomCategories] = useState([]);
  const [formselectedproductcategory, setFormSelectedProductCategory] =
    useState([]);
  const [totalSelectedFiles, setTotalSelectedFiles] = useState([]);
  const [temporaryUploadeFiles, setTemporaryUploadeFiles] = useState([]);
  const [deliveryType, setDeliveryType] = useState([]);
  const [productAllVariants, setProductAllVariants] = useState([]);
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const pathname = usePathname();
  const searchparams = useSearchParams();
  useEffect(() => {
    getAllBottomCategoriesFunApi();
  }, []);
  useEffect(() => {
    browserUrlChangePageloadingfun();
  }, [pathname]);

  const stockStatusOption = [
    { label: "Available", value: "Available" },
    { label: "UnAvailable", value: "UnAvailable" },
  ];

  const sizeOptions = [
    { label: "XS", value: "XS" },
    { label: "SM", value: "SM" },
    { label: "MD", value: "MD" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
    { label: "3XL", value: "3XL" },
    { label: "4XL", value: "4XL" },
    { label: "5XL", value: "5XL" },
  ];

  const dressOptions = [
    { label: "2pc", value: "2pc" },
    { label: "3pc", value: "3pc" },
  ];

  const dressSeason = [
    { label: "Summer", value: "Summer" },
    { label: "Winter", value: "Winter" },
    { label: "AllSeason", value: "AllSeason" },
  ];

  const fuelType = [
    { label: "Hybrid", value: "Hybrid" },
    { label: "Petrol", value: "Petrol" },
    { label: "Diesel", value: "Diesel" },
    { label: "Electric", value: "Electric" },
  ];
  const dairyFarmUnits = [
    { label: "gm", value: "gm" },
    { label: "Dozen", value: "Dozen" },
  ];

  const dairyWeightOptions = [
    { label: "125gm", value: "125gm" },
    { label: "250gm", value: "250gm" },
    { label: "500gm", value: "500gm" },
    { label: "750gm", value: "750gm" },
    { label: "1kg", value: "1kg" },
    { label: "1.250kg", value: "1.250kg" },
    { label: "1.500kg", value: "1.500kg" },
    { label: "1.750kg", value: "1.750kg" },
    { label: "2kg", value: "2kg" },
    { label: "2.250kg", value: "2.250kg" },
    { label: "2.500kg", value: "2.2500kg" },
    { label: "2.750kg", value: "2.750kg" },
    { label: "3kg", value: "3kg" },
    { label: "3.500kg", value: "3.500kg" },
    { label: "4kg", value: "4kg" },
    { label: "4.500kg", value: "4.500kg" },
    { label: "5kg", value: "5kg" },
  ];

  // table data section is start from here
  const columns = [
    {
      title: "Id",
      width: 100,
      dataIndex: "key",
      fixed: "start",
    },
    {
      title: "weight",
      width: 100,
      dataIndex: "productSize",
      fixed: "start",
    },

    {
      title: "Price",
      width: 100,
      dataIndex: "sellProductPrice",
    },
    {
      title: "Stock Status",
      width: 100,
      dataIndex: "stockStatus",
    },
    {
      title: "Qunatity",
      width: 100,
      dataIndex: "productQuantity",
    },
    {
      title: "Unit",
      width: 100,
      dataIndex: "dairyFarmUnit",
    },
    {
      title: "Sku",
      width: 100,
      dataIndex: "sku",
    },

    {
      title: "Action",
      width: 100,
      // dataIndex: "action",
      render: (_, record) => (
        <MdDeleteOutline
          className="text-red-600 text-[17px]"
          onClick={() => handleDeleteUser(record.key)}
        />
      ),
      fixed: "end",
    },
  ];

  // handleDeleteUser fun api is start from here
  const handleDeleteUser = async (userid) => {
    // console.log("userid", userid);
    const prepareData = productAllVariants.filter(
      (data, ind) => data?.key != userid,
    );
    setProductAllVariants(prepareData);
  };
  // handleDeleteUser fun api is end here
  // table data section is end here

  // browserUrlChangePageloadingfun is start from here
  const browserUrlChangePageloadingfun = () => {
    // console.log("pageloadinfun call",pathname)
    const queryparam = searchparams.getAll("id");
    // console.log("pageloadinfun call",queryparam[0])

    if (
      `${frontendDevelopmentBaseUrl}/admin/addProducts?id=${queryparam[0]}` ==
      `${frontendDevelopmentBaseUrl}${pathname}?id=${queryparam[0]}`
    ) {
      // console.log("inblock")
      setPageLoading(false);
    } else {
      // console.log("else")
      setPageLoading(true);
    }
  };
  // browserUrlChangePageloadingfun is end here

  // handleBeforeUpload fun is start from here
  const handleBeforeUpload = (file) => {
    if (totalSelectedFiles?.length == 20) {
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
    if (totalSelectedFiles?.length == 20) {
      return;
    }
    // console.log("handle")
    setTotalSelectedFiles(fileList);
  };

  // handleChangeFiles fun onchange is start from here

  // getAllBottomCategoriesFunApi fun is start from here
  const getAllBottomCategoriesFunApi = async () => {
    try {
      startLoadingBar();
      const res = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminGetAllBottomCategories}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await res.json();
      if (result?.status >= 200 && result?.status < 400) {
        stopLoadingBar();
        setAllBottomCategories(result?.data);
      }

      if (result?.status == 401) {
        router.replace("/adminLogin");
        toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        stopLoadingBar();

        toast.error(result?.message);
      }
    } catch (error) {
      stopLoadingBar();

      // console.log("error", error?.message)
      toast.error("server error");
    }
  };
  // getAllBottomCategoriesFunApi fun is end here

  // delete fun for half uploaded files from frontend oncloud server so that
  // function delete files from cloud start here
  const deleteHalfUploadedProductFileClodinaryFun = async (data) => {
    setLoader(false);
    try {
      const res = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminDeleteHalfFailFileFromCloudinary}`,
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
      // console.log("error",error?.message)
      toast.error("server error");
    }
  };

  // delete fun for half uploaded files from frontend oncloud server so that
  // function delete files from cloud end here

  // uploadProductBackendFunApi fun is start from here
  const uploadProductBackendFunApi = async (val, fildata) => {
    // setLoader(false)
    // console.log("images and videos", fildata)
    // console.log("formvalues", val)
    const data = [
      { files: fildata },
      val,
      { productsVariants: productAllVariants },
    ];
    // console.log("bodydata", data)
    // toast.success("datuploaded sucessfully")

    try {
      if (
        fildata?.length > 0 &&
        Object.keys(val)?.length > 0 &&
        productAllVariants?.length > 0
      ) {
        const res = await fetch(
          `${DevelopmentBaseUrl}${adminEndpoints?.adminaddProduct}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        const result = await res.json();
        if (result?.status >= 200 && result?.status < 400) {
          form.resetFields();
          setTotalSelectedFiles([]);
          setTemporaryUploadeFiles([]);
          setProductAllVariants([]);
          toast.success(result?.message);
          setLoader(false);
        }

        if (result?.status == 401) {
          router.replace("/adminLogin");
          toast.error(result?.message);
        }
        if (
          (result?.status >= 402 && result?.status <= 550) ||
          result?.status == 400
        ) {
          setTemporaryUploadeFiles([]);
          setLoader(false);
          toast.error(result?.message);
        }
      } else {
        setTemporaryUploadeFiles([]);
        setLoader(false);
        toast.error("server error");
      }
    } catch (error) {
      setTemporaryUploadeFiles([]);
      console.error(error?.message);
      setLoader(false);
      toast.error("server error");
    }
  };
  // uploadProductBackendFunApi fun is end here

  // onFinish success fun is start from here
  const onFinish = async (values) => {
    // console.log("formvalues", values);
    try {
      // Create FormData
      setLoader(true);
      const formData = new FormData();

      if (totalSelectedFiles?.length == 0) {
        setLoader(false);

        return toast.error("please upload images");
      }
      if (
        !values ||
        Object.keys(values)?.length == 0 ||
        productAllVariants?.length == 0
      ) {
        setLoader(false);

        return toast.error("please fill mandatory form fields");
      }

      // Append all text fields data
      // Object.entries(values).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      // Append all images/videos
      // console.log("total selectedfiles", totalSelectedFiles);

      // Send request to backend create a digital signature of cloudinary start here
      const res = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.addProductGeneratePreSignedUrl}`,
        {
          method: "GET",
          credentials: "include", // Send cookies with the request
        },
      );
      // Send request to backend create a digital signature of cloudinary end here

      const result = await res.json();
      if (result?.status >= 200 && result?.status < 400) {
        // console.log("digitalsignature data", result)

        for (const dat of totalSelectedFiles) {
          formData.append("file", dat?.originFileObj);
          formData.append("api_key", result?.apiKey);
          formData.append("timestamp", result?.timestamp);
          formData.append("signature", result?.signature);
          formData.append("folder", result?.folder);

          // Send request to cloud cloudinary storage save images and video on cloud api start here

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${result?.cloudName}/auto/upload`,
            {
              method: "POST",
              body: formData,
            },
          );
          // Send request to cloud cloudinary storage save images and video on cloud api end here

          if (!response?.ok) {
            if (temporaryUploadeFiles?.length > 0) {
              const check = await deleteHalfUploadedProductFileClodinaryFun(
                temporaryUploadeFiles,
              );
              // return console.log("check",check)
              if (check == "true") {
                setTemporaryUploadeFiles([]);
                setLoader(false);
                return toast.error("server error please upload product again");
              }
              if (check == "false") {
                setTemporaryUploadeFiles([]);
                setLoader(false);
                return toast.error("server error please upload product again");
              }
            }
            setTemporaryUploadeFiles([]);
            setLoader(false);
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
        }

        return uploadProductBackendFunApi(values, temporaryUploadeFiles);
      }

      if (result?.status == 401) {
        router.replace("/adminLogin");
        toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setLoader(false);
        toast.error(result?.message);
      }
    } catch (error) {
      setLoader(false);
      toast.error("server error");
    }
  };
  // onFinish success fun is end here

  // onFinishFailed form fun is start from here
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    toast.error("please must fill mandatory fields");
    // message?.warning("please must fill mandatory fields")
  };
  // onFinishFailed form fun is start from here

  useEffect(() => {
    console.log("allvariants", productAllVariants);
  }, [productAllVariants]);

  // addProductVariantFun is start from here
  const addProductVariantFun = () => {
    const values = form.getFieldsValue([
      "productSize",
      "sellProductPrice",
      "stockStatus",
      "productQuantity",
      "dairyFarmUnit",
      "sku",
    ]);
    if (
      !values ||
      Object.keys(values)?.length == 0 ||
      !values?.productSize ||
      !values?.sellProductPrice ||
      !values?.stockStatus ||
      !values?.productQuantity ||
      !values?.dairyFarmUnit
    ) {
      return toast.error("please must fill mandatory fields");
    }
    // console.log("prdouct variant values", values);
    const data = { ...values, key: crypto.randomUUID() };

    setProductAllVariants((prev) => [...prev, data]);
    form.resetFields([
      "productSize",
      "sellProductPrice",
      "stockStatus",
      "productQuantity",
      "dairyFarmUnit",
      "sku",
    ]);
  };
  // addProductVariantFun is end here

  return (
    <div>
      {pageLoading == false ? (
        <div className="bg-[#f5f5f5] px-[5px] py-[5px] xs:px-[15px] xs:py-[15px] sm:px-[24px] sm:py-[24px]">
          <Form
            form={form}
            className=""
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={24} className="">
              {/* LEFT */}

              <Col className="" xs={24} lg={16}>
                <Space
                  orientation="vertical"
                  size={20}
                  style={{ width: "100%" }}
                >
                  <Card
                    className="[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]"
                    title={
                      <span className="text-[12px] sm:text-[16px]">
                        Product Information
                      </span>
                    }
                  >
                    <Form.Item
                      className="mb-1.5! sm:mb-2! md:mb-5!"
                      label={
                        <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                          Product Name
                        </span>
                      }
                      name="productName"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-[8px] xs:text-[10px] mb-1!">
                              Please enter the product name
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        className="placeholder:text-[8px]!  md:placeholder:text-[14px]!"
                        placeholder="Enter product name"
                      />
                    </Form.Item>

                    <Row className="" gutter={16}>
                      <Col className="" span={24}>
                        <Form.Item
                          className="mb-1.5! sm:mb-2! md:mb-5!"
                          name={"productCategory"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Select Product Category
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: (
                                <span className="text-[8px] xs:text-[10px] mb-1!">
                                  Please select product category
                                </span>
                              ),
                            },
                          ]}
                        >
                          <Select
                            className="placeholder:text-[9px]!  md:placeholder:text-[14px]!"
                            onChange={(value) =>
                              setFormSelectedProductCategory(value)
                            }
                            placeholder={
                              <span className="text-[8px] md:text-[14px]">
                                Select your category
                              </span>
                            }
                            showSearch={false}
                            fieldNames={{
                              label: "category_name",
                              value: "id",
                            }}
                            options={allBottomCategories}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          initialValue={null}
                          className="mb-1.5! sm:mb-2! md:mb-5!"
                          name={"productBrandName"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Brand
                            </span>
                          }
                        >
                          <Input
                            className="placeholder:text-[8px]!  md:placeholder:text-[14px]!"
                            placeholder="Enetr product brand name"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          initialValue={null}
                          className="mb-1.5! sm:mb-2! md:mb-5!"
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Material (optional)
                            </span>
                          }
                          name={"dairyFarmMaterial"}
                        >
                          <Input
                            className="placeholder:text-[8px]!  md:placeholder:text-[14px]!"
                            placeholder="Enter material"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      initialValue={"free"}
                      className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-1! mb-1.5! sm:mb-2! md:mb-5!"
                      name={"deliveryType"}
                      label={
                        <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                          Select Delivery type
                        </span>
                      }
                    >
                      <Radio.Group
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className=""
                      >
                        <Radio
                          className="font-Poppins text-[8px]! sm:text-[10px]! md:text-[14px]!"
                          value="free"
                        >
                          Free
                        </Radio>
                        <Radio
                          className="font-Poppins text-[8px]! sm:text-[10px]! md:text-[14px]!"
                          value="paid"
                        >
                          Paid
                        </Radio>
                      </Radio.Group>
                    </Form.Item>

                    {deliveryType == "paid" ? (
                      <Col span={24}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"deliveryCharges"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Delivery charges
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: (
                                <span className="text-[8px] xs:text-[10px] mb-1!">
                                  Please enter deleivery charges
                                </span>
                              ),
                            },
                          ]}
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter delivery charges"
                            type="number"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    ) : (
                      <Form.Item
                        initialValue={null}
                        className="hidden [&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                        name={"deliveryCharges"}
                        label={
                          <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                            Delivery charges
                          </span>
                        }
                      >
                        <InputNumber
                          className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                          placeholder="Enter delivery charges"
                          type="number"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    )}
                  </Card>

                  {/* product price section card is star from here */}
                  <Card
                    className="[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]"
                    title={
                      <span className="text-[12px] sm:text-[16px]">
                        Pricing
                      </span>
                    }
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"actualproductPrice1kg"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Product Actual Price 1kg
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: (
                                <span className="text-[8px] xs:text-[10px] mb-1!">
                                  Please enter product actual price
                                </span>
                              ),
                            },
                          ]}
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter product actual price"
                            type="number"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"productSellPrice1kg"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Product Sell Price 1kg
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: (
                                <span className="text-[8px] xs:text-[10px] mb-1!">
                                  Please enter product sell price
                                </span>
                              ),
                            },
                          ]}
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter product actual price"
                            type="number"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      {/* <Col span={24} sm={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"sellProductPrice"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Product Sell Price
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: (
                                <span className="text-[8px] xs:text-[10px] mb-1!">
                                  Please enter product selling price
                                </span>
                              ),
                            },
                          ]}
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter product sell price"
                            type="number"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"stockStatus"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Product Stock Status
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: (
                                <span className="text-[8px] xs:text-[10px] mb-1!">
                                  Please select product stock status
                                </span>
                              ),
                            },
                          ]}
                        >
                          <Select
                            placeholder={
                              <span className="text-[8px] md:text-[14px]">
                                Select stock status
                              </span>
                            }
                            options={stockStatusOption}
                          />
                        </Form.Item>
                      </Col> */}

                      <Col span={12}>
                        <Form.Item
                          initialValue={null}
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"productDiscount"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Product Discount Price (Optional)
                            </span>
                          }
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter prdouct discount price"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          initialValue={null}
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"productPromoCode"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Product Promo Code (Optional)
                            </span>
                          }
                        >
                          <Input
                            className="placeholder:text-[8px]!  md:placeholder:text-[14px]!"
                            placeholder="Enter product promo code"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          initialValue={null}
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              Expiry Date (optional)
                            </span>
                          }
                          name="dairyFarmExpiryDate"
                        >
                          <DatePicker
                            className="custom-datepicker"
                            style={{ width: "100%" }}
                            placeholder="Select expiry date"
                            format="DD-MM-YYYY"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                  {/* product price section card is end here */}

                  {/* product description card is start from here section */}

                  <Card
                    className="[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]"
                    title={
                      <span className="text-[12px] sm:text-[16px]">
                        Description
                      </span>
                    }
                  >
                    <Form.Item
                      className="mb-1.5! sm:mb-2! md:mb-5!"
                      name={"productDescription"}
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-[8px] xs:text-[10px] mb-1!">
                              Please enter product description
                            </span>
                          ),
                        },
                      ]}
                      label={
                        <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                          Short Description
                        </span>
                      }
                    >
                      <TextArea
                        placeholder="Enter product detail or description"
                        rows={7}
                      />
                    </Form.Item>
                  </Card>
                  {/* product price section card is end here */}

                  {/* for dairyfarm measurements specifications card is start from here */}
                  <Card
                    className="[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]"
                    title={
                      <span className="text-[12px] sm:text-[16px]">
                        Specifications
                      </span>
                    }
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          label={
                            <div className="flex gap-1 items-center justify-center">
                              <span className="text-[12px] text-red-600">
                                *
                              </span>

                              <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                                Select Weight
                              </span>
                            </div>
                          }
                          name={"productSize"}
                        >
                          <Select
                            placeholder={
                              <span className="text-[8px] md:text-[14px]">
                                Select weight size
                              </span>
                            }
                            showSearch={false}
                            options={dairyWeightOptions}
                          />
                          {/* <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            style={{ width: "100%" }}
                            type="number"
                            placeholder={"Enetr weight"}
                          /> */}
                        </Form.Item>
                      </Col>
                      <Col span={24} sm={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"sellProductPrice"}
                          label={
                            <div className="flex gap-1 items-center justify-center">
                              <span className="text-[12px] text-red-600">
                                *
                              </span>
                              <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                                Product Sell Price
                              </span>
                            </div>
                          }
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter product sell price"
                            type="number"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"stockStatus"}
                          label={
                            <div className="flex gap-1 items-center justify-center">
                              <span className="text-[12px] text-red-600">
                                *
                              </span>
                              <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                                Product Stock Status
                              </span>
                            </div>
                          }
                        >
                          <Select
                            placeholder={
                              <span className="text-[8px] md:text-[14px]">
                                Select stock status
                              </span>
                            }
                            options={stockStatusOption}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          name={"productQuantity"}
                          label={
                            <div className="flex gap-1 items-center justify-center">
                              <span className="text-[12px] text-red-600">
                                *
                              </span>
                              <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                                Quantity
                              </span>
                            </div>
                          }
                        >
                          <InputNumber
                            className="[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]"
                            placeholder="Enter product quantity"
                            type="number"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          label={
                            <div className="flex gap-1 items-center justify-center">
                              <span className="text-[12px] text-red-600">
                                *
                              </span>
                              <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                                Unit
                              </span>
                            </div>
                          }
                          name={"dairyFarmUnit"}
                        >
                          <Select
                            placeholder={
                              <span className="text-[8px] md:text-[14px]">
                                Select unit
                              </span>
                            }
                            showSearch={false}
                            options={dairyFarmUnits}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          initialValue={null}
                          className="[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!"
                          // className="mb-1.5! sm:mb-2! md:mb-5!"
                          name={"sku"}
                          label={
                            <span className="font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]">
                              SKU (Optional)
                            </span>
                          }
                        >
                          <Input
                            className="placeholder:text-[8px]!  md:placeholder:text-[14px]!"
                            placeholder="Enter sku number"
                          />
                        </Form.Item>
                      </Col>

                      <div className="mt-4 w-full flex justify-center items-center">
                        <Button
                          onClick={addProductVariantFun}
                          className="w-[250px] font-Poppins text-white! text-[14px] mb-3 bg-darkGreen!"
                        >
                          Add Variant
                        </Button>
                      </div>

                      {/* table section is start from  */}
                      <Col span={24}>
                        <Table
                          bordered
                          className="mt-[50px] [&_.ant-table-tbody>tr>td]:text-[13px] [&_.ant-table-tbody>tr>td]:font-Poppins"
                          columns={columns}
                          dataSource={productAllVariants}
                          scroll={{ x: "max-content" }}
                          pagination={false}
                        />
                      </Col>
                      {/* // table section is end here */}
                    </Row>
                  </Card>
                  {/* for dairyfarm specifications card is end here */}

                  {/* for cloth specifications card is start from here */}

                  {/* <Card className='[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]' title={<span className='text-[12px] sm:text-[16px]'>Specifications</span>}>

                  <Row gutter={16}>


                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please select dress size</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Size</span>} name={"dressSize"} >
                        <Select placeholder={<span className='text-[8px] md:text-[14px]'>Select dress size</span>} showSearch={false} mode="multiple" options={sizeOptions} />
                      </Form.Item>
                    </Col>


                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please enter dress color</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Color</span>} name={"dressColor"}>
                        <Input className='placeholder:text-[8px]!  md:placeholder:text-[14px]!' placeholder='Enter dress color' />
                      </Form.Item>
                    </Col>



                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>

                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please select dress sesaon</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Dress Season</span>} name={"dressSeason"} >
                        <Select placeholder={<span className='text-[8px] md:text-[14px]'>Select dress season</span>} showSearch={false} options={dressSeason} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>

                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please select dress 2pc or 3pc</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Dress Options</span>} name={"dress2pcor3pc"} >
                        <Select placeholder={<span className='text-[8px] md:text-[14px]'>Select dress 2pc or 3pc</span>} showSearch={false} options={dressOptions} />
                      </Form.Item>
                    </Col>

                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please enter dress fabric type</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Material/Fabric</span>} name={"clothFabricType"} >
                        <Input className='placeholder:text-[8px]!  md:placeholder:text-[14px]!' placeholder='Enter fabric or cloth material' />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please enetr delivery charges</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Delivery charges</span>} name={"deliveryCharges"}>
                        <InputNumber className='[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]' style={{ width: "100%" }} type='number' placeholder='Enter delivery charges' />
                      </Form.Item>
                    </Col>



                  </Row>

                </Card> */}
                  {/* for cloth category card end here */}

                  {/* car specification card is start from  here */}

                  {/* <Card className='[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]' title={<span className='text-[12px] sm:text-[16px]'>Specifications</span>}>

                  <Row gutter={16}>

                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please select fule type</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Fuel type</span>} name={"vehicleFuelType"} >
                        <Select placeholder={<span className='text-[8px] md:text-[14px]'>Select fuel type</span>} showSearch={false} options={fuelType} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please enter vehicle model</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Model</span>} name={"vehicleModel"}  >
                        <InputNumber className='[&_.ant-input-number-input]:placeholder:text-[8px] md:[&_.ant-input-number-input]:placeholder:text-[14px]' style={{ width: "100%" }} type='number' placeholder='Enter vehicle model' />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        rules={[{
                          required: true,
                          message: <span className='text-[8px] xs:text-[10px] mb-1!'>Please enter vehicle color</span>
                        }]}
                        className='[&_.ant-form-item-label]:pb-0! md:[&_.ant-form-item-label]:pb-3! mb-1.5! sm:mb-2! md:mb-5!' label={<span className='font-Poppins text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px]'>Color</span>} name="vehicleColor">
                        <Input className='placeholder:text-[8px]!  md:placeholder:text-[14px]!' placeholder='Enter vehicle color' />
                      </Form.Item>
                    </Col>


                  </Row>



                </Card> */}

                  {/* car specification card is end here */}
                </Space>
              </Col>

              {/* RIGHT SIDEBAR */}

              <Col className="mt-[20px]! lg:mt-0! " xs={24} lg={8}>
                <div
                  style={{
                    position: "sticky",
                    top: 20,
                  }}
                >
                  <Space
                    orientation="vertical"
                    className="mt-[20px] md:mt-0"
                    style={{ width: "100%" }}
                  >
                    {/* upload images section is start from here */}

                    <Card
                      className="[&_.ant-card-body]:!p-[10px] xs:[&_.ant-card-body]:!p-[12px] sm:[&_.ant-card-body]:!p-[24px]"
                      title={
                        <span className="text-[12px] sm:text-[16px]">
                          Product Media
                        </span>
                      }
                    >
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: (
                              <span className="text-[8px] xs:text-[10px] mb-1!">
                                Please upload images & video
                              </span>
                            ),
                          },
                        ]}
                        className="mb-1.5! sm:mb-2! md:mb-5!"
                      >
                        <Dragger
                          fileList={totalSelectedFiles}
                          multiple
                          maxCount={20}
                          listType="picture"
                          accept="image/*,video/*"
                          beforeUpload={handleBeforeUpload}
                          onChange={handleChangeFiles}
                        >
                          <p>
                            <InboxOutlined style={{ fontSize: 40 }} />
                          </p>

                          <p className="font-Poppins">Upload Images & Videos</p>

                          <p className="font-Poppins">Maximum 20 files</p>

                          <p className="font-Poppins text-blue-600 font-bold">
                            Selected: {totalSelectedFiles?.length}/20
                          </p>
                        </Dragger>
                      </Form.Item>
                      {loader == false ? (
                        <Button
                          className="bg-darkGreen! font-Poppins"
                          type="primary"
                          htmlType="submit"
                          icon={<SaveOutlined />}
                          block
                          size="large"
                        >
                          Upload Product
                        </Button>
                      ) : (
                        <Button
                          className="bg-darkGreen! text-lightGreen! font-Poppins"
                          type="primary"
                          loading
                          block
                          size="large"
                        >
                          {/* Upload Product */}
                        </Button>
                      )}
                    </Card>
                    {/* upload images section is end here */}
                  </Space>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AddProducts;
