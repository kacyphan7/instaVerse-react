'use client';
import { useEffect, useState } from 'react';
import FollowingTable from './Following';
import { useRouter } from 'next/router';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import '../../css/following.css';

export default function FilterableFollowingTable() {
    //const router = useRouter();
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
        setAuthToken(localStorage.getItem('jwtToken'));
        if (typeof window !== 'undefined' && localStorage.getItem('jwtToken')) {
            axios
                .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings`)
                .then((response) => {
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setData(response.data);
                        setLoading(false);
                    } else {
                        console.log('error1', error);
                        router.push('/users/login');
                    }
                })
                .catch((error) => {
                    console.log('error2', error);
                    router.push('/users/login');
                });
        } else {
            console.log('error3', error);
            router.push('/users/login');
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main>
            <FollowingTable followings={data.followings} />
        </main>
    );
}
