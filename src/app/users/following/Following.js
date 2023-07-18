import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/following.css';
import { faker } from '@faker-js/faker';

const FollowingPage = () => {
    const [followings, setFollowings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings`)
            .then((response) => {
                setFollowings(response.data.following);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Error:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <h1>Following</h1>
            <ul className="following-list">
                {followings.map((following) => (
                    <li key={following._id} className="following-item">
                        <div className="profile-picture">
                            <img
                                src={faker.image.avatar()}
                                alt={`Profile of ${following.username}`}
                            />
                        </div>
                        <span className="following-username">{following.username}</span>
                        <button className="following-button">Unfollow</button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default FollowingPage;
