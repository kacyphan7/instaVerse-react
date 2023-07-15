import React from 'react';
import Follower from './follower';
import '../../css/follower.css';

const FollowerTable = ({ followers }) => {
    if (!followers || followers.length === 0) {
        return <p>No followers found.</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table>
                <tbody>
                    {followers.map((follower) => (
                        <Follower key={follower._id} follower={follower} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FollowerTable;
