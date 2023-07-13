'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../css/following.css';

import setAuthToken from '@/app/utils/setAuthToken';

const following = [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
    { id: 4, username: "user4" }
    // Add more users as needed
];

export default function Following() {

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();
    setAuthToken(localStorage.getItem('jwtToken'));
    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    return (
        <main>
            <div className="following-page">
                <h1>Following</h1>
                <ul className="following-list">
                    {following.map((user) => (
                        <li key={user.id}>
                            <img
                                src={`https://www.example.com/profiles/${user.username}.jpg`}
                                alt={`Profile of ${user.username}`}
                            />
                            <span>{user.username}</span>
                            <button>Unfollow</button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}