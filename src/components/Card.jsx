import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { ToastContainer, toast ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card(props) {

    let dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();           //This is for make the reference of price.

    let options = props.options;
    let priceOption = Object.keys(options);

    const [quty, setQuty] = useState(1);
    const [size, setSize] = useState("");


    const handelCart = async () => {

        let food = null
        for (const item of data) {               //This is for check that the id of cart item is equal to new selected item that means that shoud b update item
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food) {            //This is logic that if the same order quantity is change and size is same than update apply
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quty: quty,img: props.foodItem.img })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quty: quty, size: size,img: props.foodItem.img })
                 return
            }
            return
        }
       else
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quty: quty, size: size,img: props.foodItem.img })
        // console.log(data)
        toast.success('Added to Cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    let finalPrice = quty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);        //This is for set the inital value of price.
    }, [])

    return (
        <div>
            <div className="card mt-3 " style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '180px', objectFit: 'fill' }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQuty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOption.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        <div className='d-inline fs-5 h-100 ms-3'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    {localStorage.getItem('authToken')?<div className='btn btn-success justify-center ms-2' onClick={handelCart}>Add to Cart</div>:""}
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Card