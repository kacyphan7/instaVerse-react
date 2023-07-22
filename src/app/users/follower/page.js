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

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (typeof window !== 'undefined' && jwtToken) {
            setAuthToken(jwtToken);
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings`)
                .then((response) => {
                    let userData = jwtDecode(jwtToken);
                    if (userData.email === localStorage.getItem('email')) {
                        setData(response.data);
                        setLoading(false);
                    } else {
                        console.log('Error: User data mismatch');
                        router.push('/users/login');
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                    router.push('/users/login');
                });
        } else {
            console.log('Error: No JWT token found');
            router.push('/users/login');
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main>
            <FollowerTable followers={data.followers} />
        </main>
    );
}