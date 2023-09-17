'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import '../../css/post.css';
import PostTable from './PostTable';

export default function FilterablePostTable() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { username } = useParams();
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/username/${username}`)
            .then((res) => res.json())
            .then((data) => {
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