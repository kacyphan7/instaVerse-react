import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { faker } from "@faker-js/faker";
export default function User({ user }) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
            const currentTime = Date.now();

            // make a condition that compares exp and current time
            if (currentTime >= expirationTime) {
                handleLogout(); // Assuming you have defined this function somewhere
                alert('Session has ended. Please login to continue.');
                router.push('/users/login');
            }
        }
    }, [router]);

    function addUserData() {
        // add email to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('email', user.email);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('username', user.username);
            // set redirect to true
            setRedirect(true);
        }
    }

    if (redirect) {
        router.push('/users/profile');
    }

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