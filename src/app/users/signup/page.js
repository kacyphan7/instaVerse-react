// Imports
'use client';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NewUser = () => {

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);


    const [redirect, setRedirect] = useState(false);
    const router = useRouter();



    const handleFullName = (e) => {
        setFullName(e.target.value);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function
        const newUser = { fullName, username, email, password };
        console.log(newUser);
        // console.log(newUser);
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
            .then(response => {
                setRedirect(true);
            })
            .catch(error => {
                if (error.response.data.message === 'Email already exists') {
                    console.log('===> Error in Signup', error.response.data.message);
                    setError(true);
                }
            });

    };
    const handleCancel = (e) => {
        e.preventDefault();
        setRedirect(true);
    };

    if (redirect) { router.push('/users/login'); }
    if (error) {
        return (
            <div>
                <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                    <div className="card-body text-center">
                        <div>
                            <p>Email already exists</p>
                            <br />
                            <h2>Login</h2>
                            <p>Sign In to your account</p>
                            <Link href="/users/login" type="button" className="btn btn-primary active mt-3">Login</Link>
                            <span>  </span>
                            <Link href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <p className="text-muted">Create an account below to get started</p>
                        <div className="form-group">
                            <input type="text" name="fullName" value={fullName} onChange={handleFullName} className="form-control" placeholder='Full Name' required />
                        </div>
                        <div className="form-group">
                            <input type="text" name="username" value={username} onChange={handleUsername} className="form-control" placeholder='Username' required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" placeholder='Email' required />
                        </div>
                        <div className="form-group">
                            {/* <span className="input-group-addon"><i className="fa fa-lock"></i></span> */}
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" placeholder='Password' required />
                        </div>
                        <button type="submit" className="btn btn-primary float-right" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewUser;