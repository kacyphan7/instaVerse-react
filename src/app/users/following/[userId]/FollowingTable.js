import React from 'react';
import Following from './Following';
import '../../css/following.css';

const FollowingTable = ({ followings }) => {
    if (!followings || followings.length === 0) {
        return <p>No followings found.</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table>
                <tbody>
                    {followings.map((following) => (
                        <Following key={following._id} following={following} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FollowingTable;