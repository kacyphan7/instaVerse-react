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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform the necessary actions to upload the photo and caption to the server
        // For example, you can use Axios or the Fetch API to send a POST request to your server endpoint

        // Reset the form fields
        setCaption('');
        setPhoto(null);
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

