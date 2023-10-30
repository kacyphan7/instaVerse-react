'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../../css/create-post.css';
import '../../css/modal.css';


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
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [imgFromCloud, setImgFromCloud] = useState({
        data: { secure_url: "" },
    });

    const handleCaptionUpload = (e) => {
        setCaption(e.target.value);
    };

    async function handlePhotoUpload(e) {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(e.target.files[0]));
        if (file) {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'instaverse');
            await fetch('https://api.cloudinary.com/v1_1/instaversecloud/image/upload', {
                method: 'POST',
                body: data,
            })
                .then((response) => response.json())
                .then((data) => {
                    setImgFromCloud(data);
                })
                .catch((error) => console.log('Error', error));
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { createdBy: localStorage.getItem('userId'), caption: caption, photo: imgFromCloud.secure_url };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/new`, newPost)
            .then(response => {
                onClose();
                setRedirect(true);
            })
            .catch(error => console.log('===> Error', error));
    };

    if (redirect) { router.push('/users/profile/' + localStorage.getItem('userId')); }
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" style={styles.modalOverlay} onClick={onClose}>
            <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className="">
                    <form onSubmit={handleSubmit} className="add-post">
                        <div>
                            <h1 className="add-post__title">Create a Post</h1>
                            <div className="form-group">
                                <label htmlFor="photo" className="add-post__label">Select a Photo From Computer</label>
                                <input type="file" id="photo" className="hide-file-input"
                                    onChange={handlePhotoUpload} />
                            </div>
                            <br />
                        </div>
                        <div className='add-post__image'>
                            {image && <img alt="preview image" src={image} className='preview-image' />}
                        </div>
                        <br />
                        <div className="form-group">
                            <hr />
                            <br />
                            <input type="text" id="caption" className="caption-input  add-post__input"
                                value={caption} onChange={handleCaptionUpload} placeholder='Write a caption' />
                            <button type="submit" className="add-post__button" >Share</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};




