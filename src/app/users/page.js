'use client';
import { useEffect, useState } from 'react';
import UserTable from './UserTable';

export default function FilterableUserTable() {
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
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/users')
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
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <UserTable users={data.users} />
        </main>
    );
}