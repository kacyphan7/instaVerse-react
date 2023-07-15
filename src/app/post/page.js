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
import PostTable from './PostTable';





export default function FilterablePostTable() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${localStorage.getItem('username')}`)
            .then((res) => res.json())
            .then((data) => {
                // data is an object
                console.log('--- posts ---', data);
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main className='post-center'>
            <PostTable posts={data.posts} />
        </main>
    );
}