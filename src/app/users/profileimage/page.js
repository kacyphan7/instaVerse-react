// Imports
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UploadProfileImage from './uploadProfile';
import setAuthToken from '@/app/utils/setAuthToken';

const ProfileImage = ({ editProfileImage }) => {
    const [profileImage, setProfileImage] = useState(undefined);


    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    // const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    // let currentTime = Date.now();
    // setAuthToken(localStorage.getItem('jwtToken'));
    // // make a condition that compares exp and current time
    // if (currentTime >= expirationTime) {
    //     handleLogout();
    //     alert('Session has ended. Please login to continue.');
    //     router.push('/users/login');
    // }

    const handleProfileImage = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {

        e.preventDefault(); // at the beginning of a submit function
        setRedirect(true);
    };

    const handleNo = (e) => {
        e.preventDefault();
        setRedirect(true);
    };

    if (redirect) { router.push('/users/login'); }

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div >
                    <h2 className="py-2">Load Profile Image</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="file" name="profileImage" onChange={handleProfileImage} />
                        </div>
                        <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Upload</button>
                        <button type="button" className="btn btn-primary float-right" onClick={handleNo}>Skip</button>
                        {profileImage && <UploadProfileImage profileImage={profileImage} />}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileImage;