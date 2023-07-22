'use client';
import React, { useState, useEffect, use } from 'react';
import moment from 'moment';
import axios from 'axios';
import CommentLikeButton from './commentLikes';

export default function Comment({ postId, comment, userInfo }) {
    const commentDateTimeAgo = moment(new Date(comment.createdAt)).fromNow();
    const [username, setUsername] = useState('');
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${comment.createdBy}`)
            .then(response => {
                setUsername(response.data.user.username);
            })
            .catch(error => console.log('===> Error in Comment', error));
    }, [comment.createdBy]);

    const [commentLikes, setCommentLikes] = useState(comment);

    const handleUpdateLikes = (updatedLikes) => {
        // Update the likes state
        setCommentLikes((prevPost) => ({
            ...prevPost,
            likes: updatedLikes,
        }));
    };
    return (
        <>
            <br />
            <div className=" ">
                <div className="">
                    <div className="" style={{ display: 'inline-flex' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '270px' }}>
                                <div><a href={'/users/profile/' + comment.createdBy}>
                                    <strong>&nbsp;{username}</strong></a>&nbsp;{comment.comment}
                                </div>
                                <CommentLikeButton
                                    postId={postId}
                                    commentId={comment._id}
                                    loggedInUser={userInfo}
                                    likes={commentLikes.likes}
                                    handleUpdateLikes={handleUpdateLikes} />
                            </div>
                            <div style={{ display: 'inline-flex', fontSize: '10px' }}>
                                &nbsp;{commentDateTimeAgo}&nbsp;&nbsp;&nbsp;{commentLikes.likes.length + ' likes'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
