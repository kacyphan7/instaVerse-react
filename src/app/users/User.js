import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { faker } from "@faker-js/faker";
export default function User({ user }) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    function addUserData() {
        // add email to localStorage 
        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('username', user.username);
        // set redirect to true 
        setRedirect(true);
    }

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    if (redirect) { router.push('/users/profile'); }

    return (
        <tr>
            <td className="is-capitalized">{user.fullName}</td>
            <td className="is-capitalized">{user.username}</td>
            <td onClick={addUserData} style={{
                cursor: 'pointer',
            }}>
                {user.email}
            </td>
            <td><a href="/users/edit" class="card-footer-item">Edit</a></td>
        </tr>
    );
}