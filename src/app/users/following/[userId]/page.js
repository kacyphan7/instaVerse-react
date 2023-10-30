'use client';
import { useEffect, useState } from 'react';
import FollowingTable from './Following';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import '../../../css/following.css';

export default function FilterableFollowingTable() {
    //const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    if (typeof window !== 'undefined' && localStorage.getItem('jwtToken')) {
        const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
        let currentTime = Date.now();


        // make a condition that compares exp and current time
        if (currentTime >= expirationTime) {
            handleLogout();
            alert('Session has ended. Please login to continue.');
            router.push('/users/login');
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('jwtToken')) {
            const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
            const currentTime = Date.now();

            // make a condition that compares exp and current time
            if (currentTime >= expirationTime) {
                handleLogout();
                alert('Session has ended. Please login to continue.');
                router.push('/users/login');
            } else {
                setAuthToken(localStorage.getItem('jwtToken'));
                axios
                    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings`)
                    .then((response) => {
                        let userData = jwtDecode(localStorage.getItem('jwtToken'));
                        if (userData.email === localStorage.getItem('email')) {
                            setData(response.data);
                            setLoading(false);
                        } else {
                            console.log('Invalid user data.');
                            router.push('/users/login');
                        }
                    })
                    .catch((error) => {
                        console.log('Error fetching data:', error);
                        router.push('/users/login');
                    });
            }
        } else {
            console.log('No jwtToken found.');
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