'use client';
import { useEffect, useState } from 'react';
import FollowerTable from './FollowerTable';

export default function FilterableFollowerTable() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/follower')
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
            <FollowerTable followers={follower.username} />
        </main>
    );
}