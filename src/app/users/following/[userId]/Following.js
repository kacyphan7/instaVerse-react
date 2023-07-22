'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import '../../../css/following.css';
import { faker } from '@faker-js/faker';

const FollowingPage = () => {
    // const [followings, setFollowings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();
    const [followingData, setFollowingData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings/${userId}`)
            .then(followingResponse => {
                // console.log('response.data following', followingResponse.data.following[0].following);
                setFollowingData(followingResponse.data.following[0].following);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            }
            );
    }, [userId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <div className='main-style'>
                <h1>Following</h1>
                <ul className="following-list">
                    {followingData.map((following) => (
                        <li key={following._id} className="following-item">
                            <div className="profile-picture">
                                <img
                                    src={following.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                                    alt={`Profile of ${following.username}`}
                                />
                            </div>
                            <span className="following-username">{following.username}</span>
                            <button className="following-button">Unfollow</button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default FollowingPage;
