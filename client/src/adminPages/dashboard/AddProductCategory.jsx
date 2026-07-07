"use client"
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Switch } from "antd";
import { IoAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import { v4 as uuidv4 } from "uuid";
import { Spin } from "antd";

// imports start here
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Divider, Menu, } from 'antd';
// imports end here






// const items = [
//     {
//         key: '1',
//         icon: <MailOutlined />,
//         label: 'Navigation One',
//     },
//     {
//         key: '2',
//         icon: <CalendarOutlined />,
//         label: 'Navigation Two',
//     },
//     {
//         key: 'sub1',
//         label: 'Navigation Two',
//         icon: <AppstoreOutlined />,
//         children: [
//             { key: '3', label: 'Option 3' },
//             { key: '4', label: 'Option 4' },
//             {
//                 key: 'sub1-2',
//                 label: 'Submenu',
//                 children: [
//                     { key: '5', label: 'Option 5' },
//                     { key: '6', label: 'Option 6' },
//                 ],
//             },
//         ],
//     },
//     {
//         key: 'sub2',
//         label: 'Navigation Three',
//         icon: <SettingOutlined />,
//         children: [
//             { key: '7', label: 'Option 7' },
//             { key: '8', label: 'Option 8' },
//             { key: '9', label: 'Option 9' },
//             { key: '10', label: 'Option 10' },
//         ],
//     },
//     {
//         key: 'link',
//         icon: <LinkOutlined />,
//         label: (
//             <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//                 Ant Design
//             </a>
//         ),
//     },
// ];







const AddProductCategory = () => {
    const key = uuidv4();
    const [openModal, setOpenModal] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [items1, setItems] = useState([]);
    const [parentIdState, setParentIdState] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getAllCtategoriesFun()
    }, [])



    useEffect(() => {

        if (allCategories?.length < 1) return;
        makeDynamicCategoriesFun()

    }, [allCategories])


    // makeDynamicCategoriesFun IS START FROM HERE
    const makeDynamicCategoriesFun = () => {
        // Step 1: Get all parent categories
        const parents = allCategories.filter(
            (item) => item?.parent_id == null
        );

        // console.log("data",parents)

        // Step 2: Build menu structure
        console.log("parents", parents)
        const menuData = parents?.map((parent, ind) => (
            {

                key: uuidv4()?.toString(),
                label: parent?.category_name,
                id: parent?.id?.toString(),
                parent_id: parent?.parent_id?.toString(),
                is_parent: parent?.is_parent?.toString(),
                isactive_category: parent?.isactive_category?.toString(),

                children: allCategories
                    .filter((child) => child?.parent_id == parent?.id)
                    .map((child, ind) => ({

                        // for ist children

                        key: uuidv4()?.toString(),
                        label: child?.category_name,
                        id: child?.id?.toString(),
                        parent_id: parent?.id?.toString(),
                        is_parent: child?.is_parent?.toString(),
                        isactive_category: child?.isactive_category?.toString(),

                        //  for 2nd children
                        children: allCategories
                            .filter((newchild) => newchild?.parent_id == child?.id)
                            .map((newchild, ind) => ({

                                key: uuidv4()?.toString(),
                                label: newchild?.category_name,
                                id: newchild?.id?.toString(),
                                parent_id: child?.id?.toString(),
                                is_parent: newchild?.is_parent?.toString(),
                                isactive_category: newchild?.isactive_category?.toString(),


                            })),
                    })),


            })
        );
        //  console.log("categories",menuData)

        const newdata = menuData?.map((data, i) => {
            if (data?.is_parent == "true" && data?.children?.length > 0) {
                data?.children?.map((chlddat, ind) => chlddat?.children?.push({
                    key: uuidv4()?.toString(), icon: <Button icon={<IoAddSharp className='text-[30px]!' />} className='bg-darkGreen! text-lightGreen! text-[18px]! font-Poppins! ' onClick={() => { openCategoryModal(chlddat?.id) }} >Add Category
                    </Button>
                }))
                data?.children?.push({
                    key: uuidv4()?.toString(), icon: <Button icon={<IoAddSharp className='text-[30px]!' />} className='bg-darkGreen! text-lightGreen! text-[18px]! font-Poppins! ' onClick={() => { openCategoryModal(data?.id) }} >Add Category
                    </Button>
                })

            } else {
                // console.log("ist if data",data)

                data?.children?.push({
                    key: uuidv4()?.toString(), icon: <Button icon={<IoAddSharp className='text-[30px]!' />} className='bg-darkGreen! text-lightGreen! text-[18px]! font-Poppins! ' onClick={() => { openCategoryModal(data?.id) }} >Add Category
                    </Button>
                })

            }

            return data;
        });
        console.log("newdata", newdata)
        // Step 4: Set state

        // setItems(newdata)

        setItems([...newdata, {
            key: "9kjhuj", icon: <Button icon={<IoAddSharp className='text-[30px]!' />} className='bg-darkGreen! text-lightGreen! text-[18px]! font-Poppins! ' onClick={openModalfun} >Add Category
            </Button>
        }]);

    }
    // makeDynamicCategoriesFun IS END HERE



    // openCategoryModal fun is start from here
    const openCategoryModal = (id) => {
        console.log("parentid", id)
        setParentIdState(id)
        // console.log("parentid state",parentIdState)
        setOpenModal(true)
        setTimeout(() => {
            if (id != null) {
                form.setFieldsValue({ parentId: id, })
                // console.log(form.getFieldValue("parentId"));
            }
        }, 0)


    }
    // openCategoryModal fun is start from here

    // openModalfun is start from here
    const openModalfun = () => {
        setOpenModal(true)

    }
    // openModalfun is end here

    // modal function is start from here   

    const handleCancel = () => {
        form.resetFields()
        // form.setFieldValue({parentId:null})
        setParentIdState(null)
        setTimeout(() => {
            setOpenModal(false)
        }, 0)

    };
    // modal function is end here


    // form handleSubmit fun is sstart from here
    const handleSubmit = (values) => {
        // return console.log("Form Values:", values);
        // form.setFieldValue({parentId:parentIdState})
        setBtnLoader(true)
        if (values) {

            adminAddCategoryFun(values)
        }
        form.resetFields();
    };
    // form handleSubmit fun is end here


    // getAllCtategoriesFun IS START FROM HERE
    const getAllCtategoriesFun = async () => {
        try {
            const res = await fetch(`${DevelopmentBaseUrl}${adminEndpoints?.adminGetAllCategories}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await res.json();
            if (result?.status >= 200 && result?.status < 400) {
                setAllCategories(result?.data)
            }
            if (result?.status == 401) {
                setPageLoading(true)
                router.replace("/adminLogin")
                toast.error(result?.message)
            }
            if (result?.status >= 402 && result?.status <= 550 || result?.status == 400) {
                toast.error(result?.message)
            }
        } catch (error) {
            console.log("error", error?.message)
            toast.error("server error")
        }
    }
    // getAllCtategoriesFun IS END HERE

    // adminAddCategory fun is start from here 
    const adminAddCategoryFun = async (val) => {
        console.log("values", val)
        try {
            const response = await fetch(`${DevelopmentBaseUrl}${adminEndpoints?.adminAddCategories}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(val),
            });
            const result = await response.json();
            if (result?.status >= 200 && result?.status < 400) {
                setBtnLoader(false)
                await getAllCtategoriesFun()
                setOpenModal(false)
                toast.success(result?.message)
            }
            if (result?.status == 401) {
                setOpenModal(false)
                setPageLoading(true)
                router.replace("/adminLogin")
                toast.error(result?.message)
            }
            if (result?.status >= 402 && result?.status <= 550 || result?.status == 400) {
                setBtnLoader(false)
                toast.error(result?.message)
            }

        } catch (error) {
            setBtnLoader(false)

            console.log(error?.message)
            toast.error("catch server error")
        }
    }
    // adminAddCategory fun is end here 

    // from onfinishfailed fun is start from here
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
        toast.error("Please enter your credentials")

    };
    // from onfinishfailed fun is end here







    return (

        <div>{pageLoading == false ? (
            <div className=''>
                {allCategories?.length == 0 ? (
                    // <Button icon={<IoAddSharp className='text-[30px]' />} className='bg-darkGreen! text-lightGreen! text-[18px]! font-Poppins! p-[22px]!' onClick={openModalfun} >Add Category
                    // </Button>
                    <div className="flex justify-center items-center h-screen">
                        <Spin size="large" />
                    </div>

                ) : (
                    <div className="flex w-full gap-[300px]">
                        <br />
                        <br />
                        <Menu
                            style={{ width: 256 }}
                            defaultSelectedKeys={['15351']}
                            defaultOpenKeys={['sub1']}
                            mode={"vertical"}
                            // theme={theme}
                            items={items1}
                            className="border-2 border-black mt-[100px]!"

                        />
                    </div>
                )}


                {/* Modal */}
                <Modal mask={{ closable: false }} title="Add Category" destroyOnHidden open={openModal} footer={false} onCancel={handleCancel}>


                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        {/* Category Field */}
                        <Form.Item
                            label="Enter Category namse"
                            name="categoryName"
                            rules={[{ required: true, message: "Please enter category name" }]}
                        >
                            <Input type="text" placeholder="Enter category name" />
                        </Form.Item>

                        <Form.Item
                            label="Parent ID"
                            name="parentId"
                            initialValue={null}
                        >
                            <Input disabled placeholder="Enter parent id (if any)" />
                        </Form.Item>


                        {/* isParent Field (Boolean) */}
                        <Form.Item
                            label="isParent ?"
                            name="isParent"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Switch />
                        </Form.Item>

                        {/* Parent ID Field */}
                        {/* isParent Field (Boolean) */}
                        <Form.Item
                            label="isActive ?"
                            name="isActiveCategory"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Switch />
                        </Form.Item>

                        {/* Parent ID Field */}
                        {btnLoader == false ? (
                            <Button type='primary' htmlType="submit" className='w-full bgClr bg-darkGreen! text-white! text-[18px]! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!'>
                                submit
                            </Button>
                        ) : (
                            <Button loading disabled size="medium" className='min-w-full bgClr bg-darkGreen! text-white! text-[18px]! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!'>
                                {/* <Spin className="text-lightGreen" size="large" /> */}
                            </Button>

                        )}
                    </Form>
                </Modal>
            </div>) : (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        )}</div>
    )
}

export default AddProductCategory