'use client';
import User from './User';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import handleLogout from '../utils/handleLogout';

export default function UserTable({ users }) {
    const router = useRouter();
    const [expirationTime, setExpirationTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    const rows = users.map((user) => (
        <User user={user} key={user._id} />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}