'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../css/profile.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';
import UploadProfileImage from '../profileimage/uploadProfile';

export default function EditProfile() {

    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [mainProfileImage, setMainProfileImage] = useState(null);

    const handleChange = (e) => {
        setData(prevState => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleFileOpen = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Perform your upload logic here
            console.log('File opened:', file);

            setMainProfileImage(file);
            // You can initiate an upload process or perform any other necessary actions with the file
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 2000); // Fetch data every 5 seconds

        return () => {
            clearInterval(interval); // Clean up the interval on component unmount
        };
    });
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`);

            setData(response.data.user);
            setLoading(false);

        }
        catch (error) {
            console.log(error);
            router.push('/users/profile');
        };
        // const fetchData = async () => {
        //     try {
        //         const token = localStorage.getItem('jwtToken');
        //         if (!token) {
        //             // Redirect to login if JWT token is missing
        //             router.push('/users/profile');
        //             return;
        //         }
        //         setAuthToken(token);

        //         const response = await axios.get(
        //             `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`
        //         );
        //         console.log('user data', response.data.user);
        //         // Decode the token to get user data
        //         const userData = jwtDecode(token);
        //         if (userData.email === localStorage.getItem('email')) {
        //             setData(response.data.user);
        //         } else {
        //             // Redirect to login if user data doesn't match the token
        //             router.push('/users/profile');
        //         }
        //     } catch (error) {
        //         console.log(error);
        //         // Redirect to login if there's an error fetching user data
        //         router.push('/users/profile');
        //     } finally {
        //         setLoading(false);
        //     }
        // };
    };
    // fetchData();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`, data)
            .then((response) => {
                console.log(response);
                router.push('/users/profile');
            })
            .catch((error) => {
                console.log('error when editing user', error);
            });
    };

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="row mt-4">
                <div className="offset-md-3">
                    <div className="card card-body">
                        <div className="edit-profile">
                            <h1 className="edit-profile-heading">Edit Profile</h1>
                            <form className="edit-profile-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="avatar">
                                        <img src={data.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"}
                                            width='100px' alt="User Avatar" className="avatar-img" />
                                    </div>
                                    <label for='profilePicture' class="custom-file-upload">Change Profile Image</label>
                                    <input type="file" id="profilePicture" name="profilePicture" className="form-control-file" accept='.png, .jpg, .jpeg' onChange={handleFileOpen} step={{ display: 'none' }} />
                                    {mainProfileImage && <UploadProfileImage profileImage={mainProfileImage} />}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="fullName">Name</label>

                                    <input
                                        type="text" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} className="form-control" placeholder='Name' />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" name="username" value={data.username} onChange={handleChange} className="form-control" placeholder='Username' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pronouns">Pronouns</label>
                                    <input type="text" id="pronouns" name="pronouns" value={data.pronouns} onChange={handleChange} className="form-control" placeholder='Pronouns' />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea id="bio" name="bio" value={data.bio} onChange={handleChange} className="form-control" placeholder='Bio'></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" id="gender" name="gender" value={data.gender} onChange={handleChange} className="form-control" placeholder='Gender' />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">Done</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};