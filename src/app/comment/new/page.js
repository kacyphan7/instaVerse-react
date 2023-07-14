import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewComment = ({ postId }) => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState('');

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
        setComment(e.target.value);
    };

    const handleLikes = (e) => {
        setLikes(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = { username, comment, likes };
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
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Make New Comment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleUsername}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment</label>
                            <input
                                type="text"
                                name="comment"
                                value={header}
                                onChange={handleComment}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="likes">Likes</label>
                            <input
                                type="text"
                                name="likes"
                                value={likes}
                                onChange={handleLikes}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewComment;
