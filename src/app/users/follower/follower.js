import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/follower.css';
import { faker } from '@faker-js/faker';

const FollowerPage = () => {
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followers`)
            .then((response) => {
                setFollowers(response.data.followers);
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
            <h1>Followers</h1>
            <ul className="follower-list">
                {followers.map((follower) => (
                    <li key={follower._id} className="follower-item">
                        <div className="profile-picture">
                            <img
                                src={faker.image.avatar()}
                                alt={`Profile of ${follower.username}`}
                            />
                        </div>
                        <span className="follower-username">{follower.username}</span>
                        <button className="follow-button">Follow</button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default FollowerPage;


