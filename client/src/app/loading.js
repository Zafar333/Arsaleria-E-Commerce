import React from 'react'
import { Spin } from "antd";


const loading = () => {
    return (
        //  <div>loading....</div>
        <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
        </div>
    )
}

export default loading