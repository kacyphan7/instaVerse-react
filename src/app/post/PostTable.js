'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Comment from '../comment/new/page';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import moment from 'moment';
import '../css/post.css';
import Post from './Post';

export default function PostTable({ posts }) {



    const rows = [];

    posts.forEach((post) => {
        // each post and push them inside the array with the Post component (have not made)
        rows.push(
            <Post
                post={post}
                key={post._id} />
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Posts</th>
                    { /* <th>Comments</th> */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}