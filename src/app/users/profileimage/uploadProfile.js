'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingLine } from '@/app/components/Loading';

export default function UploadProfileImage({ profileImage, updateUserData }) {
    const [isLoading, setLoading] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);

    useEffect(() => {
        const handle = (image) => {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'instaverse');
            fetch('https://api.cloudinary.com/v1_1/instaversecloud/image/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const secureUrl = data.secure_url;
                    const newUser = { profilePicture: secureUrl };
                    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`, newUser)
                        .then((response) => {
                            updateUserData(response.data.user);
                            setLoading(false);
                            setImageUploaded(true);
                        })
                        .catch((error) => console.log('Error', error));
                })
                .catch((error) => console.log('Error', error));
        };
        if (!imageUploaded) {
            handle(profileImage);
        }
    }, [profileImage, updateUserData, imageUploaded]);

    if (isLoading) return (<LoadingLine />);
};