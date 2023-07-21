'use client';
import React, { useState, useEffect, use } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { faker } from "@faker-js/faker";
export default function Comment({ comment, userInfo }) {
    const commentDateTimeAgo = moment(new Date(comment.updatedAt)).fromNow();
    const [username, setUsername] = useState('');
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${comment.createdBy}`)
            .then(response => {
                setUsername(response.data.user.username);
            })
            .catch(error => console.log('===> Error in Comment', error));
    }, [comment.createdBy]);


    return (
        <>
            <br />
            <div className="box-footer box-comments">
                <div className="box-comment">

                    <div className="comment-text" style={{ display: 'inline-flex' }}>
                        <div>
                            <a href={'/users/profile/' + comment.createdBy} className="nav-link text-white">
                                <img src={userInfo.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"} style={{ width: '30px', height: '30px' }} />
                            </a>
                        </div>
                        <div>
                            <div>
                                <a href={'/users/profile/' + comment.createdBy}>
                                    <strong>&nbsp;{username}</strong></a>&nbsp;{comment.comment}
                            </div>
                            {/* <div>
                                &nbsp;{commentDateTimeAgo}&nbsp;&nbsp;&nbsp;&nbsp; {comment.likes ? comment.likes + likes : []}
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
