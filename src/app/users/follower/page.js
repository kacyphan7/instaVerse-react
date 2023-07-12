'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../follower.css';

const followers = [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
    { id: 4, username: "user4" }
    // Add more followers as needed
];
export default function Follower() {

    // const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    // let currentTime = Date.now();

    // // make a condition that compares exp and current time
    // if (currentTime >= expirationTime) {
    //     handleLogout();
    //     alert('Session has ended. Please login to continue.');
    //     router.push('/users/login');
    // }

    return (
        <main>
            <div className="follower-list-page">
                <h1>Followers</h1>
                <ul className="follower-list">
                    {followers.map((follower) => (
                        <li key={follower.id}>
                            <img
                                src={`https://www.localhost8000.com/followers/${follower.username}.jpg`}
                                alt={`Profile of ${follower.username}`}
                            />
                            <span>{follower.username}</span>
                            <button>follow</button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}