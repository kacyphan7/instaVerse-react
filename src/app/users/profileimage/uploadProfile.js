'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';







export default function UploadProfileImage({ profileImage }) {
    // const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const handle = (image) => {
        // console.log('This is happening');
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'instaverse');
        fetch('https://api.cloudinary.com/v1_1/instaversecloud/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                const secureUrl = data.secure_url;
                const newUser = { profilePicture: secureUrl };
                axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`, newUser)
                    .then((response) => {
                        // console.log('response.data', response.data);
                        // setRedirect(true);
                        setLoading(false);
                    })
                    .catch((error) => console.log('Error', error));
            })
            .catch((error) => console.log('Error', error));
    };

    // Call the handle function when the component mounts
    React.useEffect(() => {
        handle(profileImage);
    }, [profileImage]);

    if (isLoading) return <p>Loading...</p>;
    // return <div>Loading...</div>; // Placeholder while the upload is in progress
}