import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function Login() {
  const [details, setDetails] = useState({ email: '', password: '' })

  let navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: details.email, password: details.password })   //same name as ve take in backend
    })

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert('Enter valid Details');
    }

    else {
      localStorage.setItem("userEmail",details.email);
      localStorage.setItem("authToken",json.authToken);
       navigate('/');
    }

  }

  const handelChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',height: '100vh', backgroundSize: 'cover' }}>
      <Navbar/>
      <div className='container w-50 justify-content-center mt-5'>
        <form onSubmit={handelSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={details.email} onChange={handelChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={details.password} onChange={handelChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/creatuser' className='m-3 btn btn-danger'>New user</Link>
        </form>
      </div>
    </div>
  )
}

export default Login