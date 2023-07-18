'use client';
import React, { useState, useEffect, use } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { faker } from "@faker-js/faker";
export default function Comment({ comment, userInfo }) {
    const commentDateTimeAgo = moment(new Date(comment.updatedAt)).fromNow();

    return (
        <>
            <br />
            <div className="box-footer box-comments">
                <div className="box-comment">

                    <div className="comment-text" style={{ display: 'inline-flex' }}>
                        <div>
                            <a href={'/users/profile/' + comment.username} className="nav-link text-white">
                                <img src={"https://freesvg.org/img/abstract-user-flat-4.png" || userInfo.profilePicture} style={{ width: '30px' }} />
                            </a>
                        </div>
                        <div>
                            <div>
                                <a href={'/users/profile/' + comment.username}>
                                    <strong>&nbsp;{comment.username}</strong></a>&nbsp;{comment.comment}
                            </div>
                            <div>
                                &nbsp;{commentDateTimeAgo}&nbsp;&nbsp;&nbsp;&nbsp; {comment.likes ? comment.likes + likes : []}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
