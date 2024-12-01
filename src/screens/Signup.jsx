import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Signup() {

    const [details, setDetails] = useState({ name: '', email: '', password: '', geolocation: '' })

    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password, location: details.geolocation })   //same name as ve take in backend
        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert('Enter valid Details');
        }

        setDetails({ name: '', email: '', password: '', geolocation: '' });

        if (json.success)
            navigate('/login');

    }

    const handelChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    return (
        <div  style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',height: '100vh',backgroundSize: 'cover' }}>
            <Navbar />
            <div className='container w-50 justify-content-center mt-5'>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={details.name} onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={details.email} onChange={handelChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={details.password} onChange={handelChange} id="exampleInputPassword1" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={details.geolocation} onChange={handelChange} id="exampleInputAddress" />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup