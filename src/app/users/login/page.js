"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import '../../css/login.css';

export default function Login() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        // fill in code
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        // fill in code
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password })
            .then(response => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('jwtToken', response.data.token);
                    localStorage.setItem('email', response.data.userData.email);
                    localStorage.setItem('expiration', response.data.userData.exp);
                    localStorage.setItem('userId', response.data.userData.id);
                    localStorage.setItem('username', response.data.userData.username);
                    setAuthToken(response.data.token);
                    let decoded = jwtDecode(response.data.token);
                    setRedirect(true);
                }
            })
            .catch(error => {
                if (error.response.data.message === 'User not found') {
                    console.log('===> Error in Login', error.response.data.message);
                    setError(true);
                }
            });

    };

    if (redirect) { router.push('/'); }
    if (error) {
        return (
            <main className="d-flex justify-content-center align-items-center vh-100">
                <div className="row ">
                    <div className="col-md-6 ">
                        <div className="card card-body wrong-password" >
                            <h2 className="py-2 instaverse-heading">InstaVerse</h2>
                            <div>
                                <p>Please verify your email or password is correct.</p>
                                <br />
                                <div className='align'>
                                    <a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
                                    <span> &nbsp; Or &nbsp;</span>
                                    <a href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

        );
    }

    return (
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="align">
                <div className="col-md-6">
                    <div className="card card-body">
                        <h2 className="py-2 instaverse-heading">InstaVerse</h2>
                        <form className="form-container" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword} required />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary center-button login-button">Login</button>
                            </div>
                            <p className="forgot-password">
                                <a href="/#">Forgot password?</a>
                            </p>
                        </form>
                    </div>
                    <br />
                    <div className="card card-body ">
                        <p className="text-muted mb-0">Do not have an account? <a href="/users/signup" className="btn btn-primary center-button login-button">Sign up</a></p>
                    </div>
                </div>
            </div>
        </main>
    );
}