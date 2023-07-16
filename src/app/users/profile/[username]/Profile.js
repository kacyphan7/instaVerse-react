'use client';
import React, { useState, useEffect } from 'react';
import '../../../css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import { useRouter, useParams } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import Link from 'next/link';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';
import MyComponent from './MyComponent';
import { use } from 'passport';

export default function Profile({ posts, userInfo }) {
    const { username } = useParams();
    const router = useRouter();
    // const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    // const [posts, setPosts] = useState(null);
    const [orderOneComplete, setOrderOneComplete] = useState(true);

    // const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    // let currentTime = Date.now();

    // // make a condition that compares exp and current time
    // if (currentTime >= expirationTime) {
    //     handleLogout();
    //     alert('Session has ended. Please login to continue.');
    //     router.push('/users/login');
    // }

    // useEffect(() => {
    //     setAuthToken(localStorage.getItem('jwtToken'));
    //     if (localStorage.getItem('jwtToken')) {
    //         // if (orderOneComplete) {
    //         axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
    //             .then((response) => {
    //                 // data is an object
    //                 let userData = jwtDecode(localStorage.getItem('jwtToken'));
    //                 if (userData.email === localStorage.getItem('email')) {
    //                     axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}`)
    //                         .then((response) => {
    //                             // data is an object
    //                             setData(response.data.user);
    //                             setLoading(false);
    //                         });

    //                 } else {
    //                     setTimeout(() => {
    //                         router.push('/users/login');
    //                     }, 0);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 setTimeout(() => {
    //                     router.push('/users/login');
    //                 }, 0);
    //             });
    //         // }
    //     } else {
    //         setTimeout(() => {
    //             router.push('/users/login');
    //         }, 0);
    //     }
    // }, [router, username]);


    // if (isLoading) return <p>Loading...</p>;
    // if (!userInfo) return <p>No userInfo shown...</p>;

    return (
        <main>
            <div className="container">
                <div className="profile">
                    <div className="profile-image">
                        <img src={userInfo.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"}
                            alt="Profile Image" />
                    </div>

                    <div className="profile-user-settings">
                        {localStorage.getItem('username') === username
                            ?
                            <div>
                                <h1 className="profile-user-name">{username}</h1>
                                <a href="/users/edit"><button className="btn profile-edit-btn">Edit Profile</button> </a>
                                <button
                                    className="btn profile-settings-btn"
                                    aria-label="profile settings">
                                    <FontAwesomeIcon icon={faCog} className="me-2" />
                                </button>
                            </div>
                            :
                            <div>
                                <div className="profile-user-settings">
                                    <h1 className="profile-user-name">{username}</h1>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="profile-stats">
                        <ul>
                            <li>
                                <span className="profile-stat-count">{posts && posts.length ? posts.length : '0'}</span> posts
                            </li>
                            <li>
                                <span className="profile-stat-count">188</span> followers
                            </li>
                            <li>
                                <span className="profile-stat-count">206</span> following
                            </li>
                        </ul>
                    </div>
                    <div className="profile-bio">
                        <p>
                            <span className="profile-real-name">{userInfo.fullName}</span> {userInfo.bio || ''}
                        </p>
                    </div>
                </div>
            </div>

            <div><MyComponent posts={posts} /></div>
            {/* {posts && posts.map((post) => {
                            return (
                                <Link href={'/post/' + username} key={post._id}>
                                    <div className='gallery-container'>
                                        <img src={post.photo} className="gallery-image" alt="" />

                                        <div className='gallery-stuff'>
                                            <ul>
                                                <li className="gallery-item-likes">
                                                    <span className="visually-hidden">Likes:</span>
                                                    <FontAwesomeIcon icon={faHeart} className="me-2" />{post.likes}
                                                    &nbsp;
                                                    <span className="visually-hidden">Comments:</span>
                                                    <FontAwesomeIcon icon={faComment} className="me-2" />{post.comments.length}
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })} */}

        </main >
    );
}
