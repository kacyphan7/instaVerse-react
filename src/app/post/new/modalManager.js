// ModalManager.js
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';
import '../../css/create-post.css';
import ModalComponent from './modalComponent';
import setAuthToken from '@/app/utils/setAuthToken';
import { use } from 'passport';


export default function ModalManager({ isOpen, onClose }) {


    const styles = {
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            justifyContent: 'center',
            textalign: 'center',
            width: '1000px',
            height: '1000px',
            background: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        },
    };
    const [caption, setCaption] = useState('');
    const [photo, setPhoto] = useState(null);
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();


    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {

        e.preventDefault(); // at the beginning of a submit function

        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', 'instaverse');
        axios.post('https://api.cloudinary.com/v1_1/instaversecloud/image/upload', formData)
            .then(response => {

                const secureUrl = response.data.secure_url;
                const newPost = { username: localStorage.getItem('username'), caption: caption, photo: secureUrl, likes: 0 };
                console.log('newPost', newPost);
                axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${localStorage.getItem('username')}/posts/new`, newPost)
                    .then(response => {
                        console.log(response.data);
                        // sessionStorage.setItem('userId', user._id);
                        setRedirect(true);
                    })
                    .catch(error => console.log('===> Error in Signup1', error));
            })
            .catch(error => console.log('===> Error in Signup2', error));
    };




    const handleNo = (e) => {
        e.preventDefault();
        setRedirect(true);
    };

    // if (redirect) { router.push('/users/profile/' + localStorage.getItem('username')); }loxl
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" style={styles.modalOverlay} onClick={onClose}>
            <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className="container">

                    <form onSubmit={handleSubmit} className="add-post">
                        <div>
                            <h1 className="add-post__title">Create a Post</h1>
                            <div className="form-group">
                                <label htmlFor="photo" className="add-post__label">Select a Photo From Computer</label>
                                <input type="file" id="photo" className="form-control add-post__input"
                                    onChange={handlePhotoChange} />
                            </div>
                            <br />

                        </div>
                        <div className='add-post__image'>
                            {image && <img alt="preview image" src={image} />}
                        </div>
                        <br />

                        <div className="form-group">
                            <hr />
                            <br />
                            <input type="text" id="caption" className="form-control add-post__input"
                                value={caption} onChange={handleCaptionChange} placeholder='Write a caption' />
                            <button type="submit" className="add-post__button" >Share</button>
                        </div>
                    </form>
                </div>
                <ModalComponent onClose={onClose} />

            </div>
        </div>
    );
};




