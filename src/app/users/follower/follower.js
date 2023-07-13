import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { faker } from "@faker-js/faker";

export default function Follower({ follower }) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    function addUserData() {
        // add email to sessionstorage 
        sessionStorage.setItem('email', user.email);
        // set redirect to true 
        setRedirect(true);
    }

    if (redirect) { router.push('/followers'); }

    // add cloudinary for user's images 

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