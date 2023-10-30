'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadProfileImage from './uploadProfile';

const ProfileImage = ({ editProfileImage }) => {
    const [profileImage, setProfileImage] = useState(undefined);


    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

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
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card card-body">
                        <div >
                            <h2 className="py-2">Load Profile Image</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="file" name="profileImage" onChange={handleProfileImage} />

                                </div>

                                <button type="submit" className="btn btn-primary " onClick={handleSubmit}>Upload</button>
                                <button type="button" className="btn btn-primary " onClick={handleNo}>Skip</button>
                                {profileImage && <UploadProfileImage profileImage={profileImage} />}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </main>


    );
};

export default ProfileImage;