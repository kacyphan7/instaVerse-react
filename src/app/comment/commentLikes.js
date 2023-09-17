
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const CommentLikeButton = ({ postId, commentId, loggedInUser, likes, handleUpdateLikes }) => {
    const userIdIncludedInLike = () => {
        return likes.includes(loggedInUser._id);
    };

    const handleLikeButtonClick = () => {
        if (userIdIncludedInLike()) {
            // Remove the like
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}/comments/${commentId}/removeLikes`, { userId: loggedInUser._id })
                .then((response) => {
                    handleUpdateLikes(response.data.comment.likes);
                })
                .catch((error) => console.log('===> Error in removing like', error));
        } else {
            // Add the like
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}/comments/${commentId}/addLikes`, { userId: loggedInUser._id })
                .then((response) => {
                    handleUpdateLikes(response.data.comment.likes);
                })
                .catch((error) => console.log('===> Error in adding like', error));
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-default btn-xs" onClick={handleLikeButtonClick} style={{ right: '0', marginRight: '5px' }}>
                {userIdIncludedInLike() ? (
                    <FontAwesomeIcon icon={faHeart} style={{ color: '#ff0000' }} className='red-heart' />
                ) : (
                    <FontAwesomeIcon icon={regularFaHeart} />
                )}
            </button>
        </div>
    );
};

export default CommentLikeButton;
