// Imports
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewUser = () => {
    const [profileImage, setProfileImage] = useState(undefined);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');


    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const handleProfileImage = (e) => {
        setProfileImage(e.target.files[0]);
    };

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

    const handleImageUrl = (e) => {
        setImageURL(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function
        if (profileImage) {
            const formData = new FormData();
            formData.append('file', profileImage);
            formData.append('upload_preset', 'instaverse');
            axios.post('https://api.cloudinary.com/v1_1/dtnostfrb/image/upload', formData)
                .then(response => {
                    const secureUrl = response.data.secure_url;
                    setImageURL(secureUrl);
                    const newUser = { profilePicture: secureUrl, fullName, username, email, password };
                    console.log(newUser);
                    // console.log(newUser);
                    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/new`, newUser)
                        .then(response => {
                            sessionStorage.setItem('userId', user._id);
                            setRedirect(true);

                        })
                        .catch(error => console.log('===> Error in Signup', error));
                })
                .catch(error => console.log('===> Error in Signup', error));
        } else {
            const newUser = { imageURL, fullName, username, email, password };
            console.log(newUser);
            // console.log(newUser);
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
                .then(response => {
                    sessionStorage.setItem('userId', user._id);
                    setRedirect(true);
                })
                .catch(error => console.log('===> Error in Signup', error));
        }
    };

    if (redirect) { router.push('/users/profile'); }

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Make New User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="file" name="profileImage" onChange={handleProfileImage} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="fullName" value={fullName} onChange={handleFullName} className="form-control" placeholder='Full Name' />
                        </div>
                        <div className="form-group">
                            <input type="text" name="username" value={username} onChange={handleUsername} className="form-control" placeholder='Username' />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" placeholder='Email' />
                        </div>
                        <div className="form-group">
                            <input type="text" name="password" value={password} onChange={handlePassword} className="form-control" placeholder='Password' />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewUser;