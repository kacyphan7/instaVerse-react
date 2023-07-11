'use client';
import { useEffect, useState } from 'react';
import PostTable from './PostTable';

export default function FilterableUserTable() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/posts')
            .then((res) => res.json())
            .then((data) => {
                console.log('--- data ---', data);
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main>
            <PostTable users={data.posts} />
        </main>
    );
}