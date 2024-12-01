import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyOrder() {

    const [orderData, setOrderData] = useState("");

    const fetchMyOrder = async () => {
        await fetch("http://localhost:8000/api/myOrderData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('userEmail') })
        }).then(async (res) => {
            let response = await res.json()
            await setOrderData(response)
        })
    }


    useEffect(() => {
        fetchMyOrder();
        console.log()
    }, []);

    return (
        <div style={{ backgroundImage: 'url("data:image/jpeg;base64,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")' }}>
            <div><Navbar /></div>

            {/* ****************************************** */}

            <div className='container'>
                <div className='row'>

                    {orderData ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div key={arrayData._id} >
                                                    {arrayData.Order_date
                                                        ?
                                                        <div className='m-auto mt-5 fs-5'>
                                                            {data = arrayData.Order_date}
                                                            <hr />
                                                        </div>
                                                        :
                                                        <div className='col-12 col-md-6 col-lg-3'>
                                                            <div className="card mt-3 mb-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0 mb-3' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.quty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span><br />
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>₹{arrayData.price}/-</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : <div className='m-5 w-100 text-center fs-3'>Order is Empty.<br /> Place your first order</div>
                        )
                    }) : ""}
                </div>
            </div>


            {/* ********************************************** */}

            <div><Footer /></div>
        </div>
    )
}

export default MyOrder
