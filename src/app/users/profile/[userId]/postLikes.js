import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import '../../../css/profile.css';

const LikeButton = ({ postId, loggedInUser, likes, handleUpdateLikes }) => {
    const userIdIncludedInLike = () => {
        return likes.includes(loggedInUser._id);
    };

    const handleLikeButtonClick = () => {
        if (userIdIncludedInLike()) {
            // Remove the like
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}/removeLikes`, { userId: loggedInUser._id })
                .then((response) => {
                    handleUpdateLikes(response.data.post.likes);
                })
                .catch((error) => console.log('===> Error in removing like', error));
        } else {
            // Add the like
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}/addLikes`, { userId: loggedInUser._id })
                .then((response) => {
                    handleUpdateLikes(response.data.post.likes);
                })
                .catch((error) => console.log('===> Error in adding like', error));
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-default btn-xs" onClick={handleLikeButtonClick}>
                {userIdIncludedInLike() ? (
                    <FontAwesomeIcon icon={faHeart} size='xl' className='red-heart'
                        style={{ color: '#ff0000' }} />
                ) : (
                    <FontAwesomeIcon icon={regularFaHeart} size='xl' className='icon-style' />
                )}
            </button>
        </div>
    );
};

export default LikeButton;
