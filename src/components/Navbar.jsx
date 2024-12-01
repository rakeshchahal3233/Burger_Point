import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer';
import { useDispatchCart } from './ContextReducer'

function Navbar() {

    const navigate = useNavigate();
    const [cartView, setCartView] = useState(false);

    let data = useCart();

    let dispatch = useDispatchCart();

    const handelClick = () => {
        localStorage.removeItem("authToken");
        dispatch({type:'DROP'})
        navigate('/');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">BurgerPoint</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            {/* <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li> */}
            
                            {(localStorage.getItem("authToken")) ?     //This is for show the my order button when the user is login
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                                </li>
                                : ""}

                        </ul>
                        {(!localStorage.getItem("authToken")) ?      //This is for show the login or signUp button when user is not login
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/creatuser">SignUp</Link>
                            </div>

                            :             //This is for show the cart and logout button when user is login
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                    My Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                    {data.length !== 0
                                        ?
                                        <span className='badge badge-pill bg-danger d-inline-flex align-items-center justify-content-center' style={{ left: '8%', borderRadius: '50%', height: '20px', width: '20px', padding: '12px' }}>{data.length}</span>
                                        : ''}
                                </div>
                                {/* This logic for view the cart */}
                                {
                                    cartView ?
                                        <Modal onClose={() => { setCartView(false) }}><Cart /></Modal>
                                        : null
                                }

                                <div className='btn bg-white text-danger mx-2' onClick={handelClick}>Logout</div>
                                {/* <span>{localStorage.getItem("userEmail")}</span> */}
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar