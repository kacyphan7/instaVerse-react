// Imports
'use client';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../css/signup.css';

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
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <h2 className="py-2 instaverse-heading">InstaVerse</h2>
                        <form className="form-container" onSubmit={handleSubmit}>
                            {/* Sign-up form content */}
                            <p className="text-muted instaverse-description">
                                Sign up to see photos and videos from your friends.
                            </p>
                            {/* Full Name input */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={fullName}
                                    onChange={handleFullName}
                                    className="form-control"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            {/* Username input */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={handleUsername}
                                    className="form-control"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            {/* Email input */}
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmail}
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            {/* Password input */}
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePassword}
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            {/* Sign-up agreement */}
                            <p className="text-muted small-font">
                                People who use our service may have uploaded your contact information to InstaVerse.{" "}
                                <a href="/learn-more">Learn More</a>
                                <br />
                                <br />
                                By signing up, you agree to our <a href="/terms">Terms</a>,{" "}
                                <a href="/privacy-policy">Privacy Policy</a>, and <a href="/cookies-policy">Cookies Policy</a>.
                            </p>
                            {/* Sign-up button */}
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary center-button">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Login card */}
                <div className="card card-body card-login">
                    <p className="text-muted mb-0">
                        Have an account? <a href="/users/login">Login</a>
                    </p>
                </div>
            </div>
        </main>

    );
};

export default NewUser;