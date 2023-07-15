'use client';
import { useEffect, useState } from 'react';
import FollowerTable from './FollowerTable';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import '../../css/follower.css';

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
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/followers')
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
            <FollowerTable followers={data.followers} />
        </main>
    );
}