import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Comment = ({ postId }) => {
    const [username, setUsername] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleComment = (e) => {
        setHeader(e.target.value);
    };

    const handleLikes = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = { username, header, body };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}/comments/new`, newComment)
            .then((response) => {
                console.log('===> Yay, new comment');
                console.log(response);
                setRedirect(true);
            })
            .catch((error) => console.log('===> Error in Signup', error));
    };

    if (redirect) {
        router.push('/posts');
    }

    return (
        <div className="row mt-4">
        </div>
    );
};

export default Comment;
