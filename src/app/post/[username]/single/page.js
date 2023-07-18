'use client';
import { useEffect, useState } from 'react';
import PostTable from '../PostTable';
import { useRouter } from 'next/router';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import '../../../css/create-post.css';

export default function CreatePost() {
    const [caption, setCaption] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const formData = new FormData();

        // Append the caption and photo to the FormData object
        formData.append('caption', caption);
        formData.append('photo', photo);

        try {
            // Send a POST request to the server endpoint to upload the post
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${localStorage.getItem('username')}/posts/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Reset the form fields
            setCaption('');
            setPhoto(null);

            // Redirect the user to their profile page
            const username = localStorage.getItem('username');
            router.push(`/users/profile/${username}`);
        } catch (error) {
            console.log('Error uploading post:', error);
        }
    };
    return (
        <div className="container">
            <div className="add-post">
                <h1 className="add-post__title">Create a Post</h1>
                <form onSubmit={handleSubmit} className="add-post__form">
                    <div className="form-group">
                        <label htmlFor="photo" className="add-post__label">Photo</label>
                        <input
                            type="file"
                            id="photo"
                            className="form-control add-post__input"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="caption" className="add-post__label">Caption</label>
                        <input
                            type="text"
                            id="caption"
                            className="form-control add-post__input"
                            value={caption}
                            onChange={handleCaptionChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary add-post__button">Add Post</button>
                </form>
            </div>
        </div>
    );
}

