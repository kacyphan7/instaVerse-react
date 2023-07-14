'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../css/profile.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';

export default function EditProfile() {

    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    // Redirect to login if JWT token is missing
                    router.push('/users/login');
                    return;
                }
                setAuthToken(token);

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`
                );

                // Decode the token to get user data
                const userData = jwtDecode(token);
                if (userData.email === localStorage.getItem('email')) {
                    setData(response.data.user);
                } else {
                    // Redirect to login if user data doesn't match the token
                    router.push('/users/login');
                }
            } catch (error) {
                console.log(error);
                // Redirect to login if there's an error fetching user data
                router.push('/users/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);


    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <div className="edit-profile">
                            <h1 className="edit-profile-heading">Edit Profile</h1>
                            <form className="edit-profile-form">
                                <div className="form-group">
                                    <div className="avatar">
                                        <img
                                            src="user-avatar.png"
                                            alt="User Avatar"
                                            className="avatar-img"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        className="form-control-file"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pronouns">Pronouns</label>
                                    <textarea
                                        id="pronouns"
                                        name="pronouns"
                                        className="form-control"
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
