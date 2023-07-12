'use client';
import React, { useState, useEffect } from 'react';
import '../../profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import Link from 'next/link';

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                .then((res) => res.json())
                .then((data) => {
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    console.log('userData', userData);
                    if (userData.email === localStorage.getItem('email')) {
                        setData(data.user[0]);
                        setLoading(false);
                    } else {
                        console.log('error1');
                        router.push('/users/login');
                    }

                })
                .catch((error) => {
                    console.log(error);
                    console.log('error2');
                    router.push('/users/login');
                });
        } else {
            console.log('error3');
            router.push('/users/login');
        }


    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main>
            <div className="container">
                <div className="profile">
                    <div className="profile-image">
                        <img
                            src="https://images.unsplash.com/photo-1682685797741-f0213d24418c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzOTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=150&q=60w=152&h=152&fit=crop&crop=faces"
                            alt=""
                        />
                    </div>

                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">bobdoe_</h1>

                        <button className="btn profile-edit-btn">Edit Profile</button>

                        <button
                            className="btn profile-settings-btn"
                            aria-label="profile settings"
                        >
                            <FontAwesomeIcon icon={faCog} className="me-2" />
                        </button>
                    </div>

                    <div className="profile-stats">
                        <ul>
                            <li>
                                <span className="profile-stat-count">164</span> posts
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
                            <span className="profile-real-name">Bob Doe</span> Lorem ipsum dolor
                            sit, amet consectetur adipisicing elit 📷✈️🏕️
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="gallery">
                    <div className="gallery-item" tabIndex="0">
                        <img
                            src="https://images.unsplash.com/photo-1663573794485-6203eef8e30a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />

                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes">
                                    <span className="visually-hidden">Likes:</span>
                                    <FontAwesomeIcon icon={faHeart} className="me-2" />56
                                </li>
                                <li className="gallery-item-comments">
                                    <span className="visually-hidden">Comments:</span>
                                    <FontAwesomeIcon icon={faComment} className="me-2" /> 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="gallery-item" tabIndex="0">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1686878940830-9031355ec98c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />

                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes">
                                    <span className="visually-hidden">Likes:</span>
                                    <FontAwesomeIcon icon={faHeart} className="me-2" />89
                                </li>
                                <li className="gallery-item-comments">
                                    <span className="visually-hidden">Comments:</span>
                                    <FontAwesomeIcon icon={faComment} className="me-2" /> 5
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="gallery-item" tabIndex="0">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1682390303366-7463dcbec281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyODR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />

                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes">
                                    <span className="visually-hidden">Likes:</span>
                                    <FontAwesomeIcon icon={faHeart} className="me-2" /> 56
                                </li>
                                <li className="gallery-item-comments">
                                    <span className="visually-hidden">Comments:</span>
                                    <FontAwesomeIcon icon={faComment} className="me-2" /> 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="gallery-item" tabIndex="0">
                        <img
                            src="https://images.unsplash.com/photo-1688876100196-23fe0b1efb84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />

                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes">
                                    <span className="visually-hidden">Likes:</span>
                                    <FontAwesomeIcon icon={faHeart} className="me-2" /> 89
                                </li>
                                <li className="gallery-item-comments">
                                    <span className="visually-hidden">Comments:</span>
                                    <FontAwesomeIcon icon={faComment} className="me-2" /> 5
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gallery-item" tabIndex="0">
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />

                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes">
                                    <span className="visually-hidden">Likes:</span>
                                    <FontAwesomeIcon icon={faHeart} className="me-2" /> 56
                                </li>
                                <li className="gallery-item-comments">
                                    <span className="visually-hidden">Comments:</span>
                                    <FontAwesomeIcon icon={faComment} className="me-2" /> 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="gallery-item" tabIndex="0">
                        <img
                            src="https://images.unsplash.com/photo-1688380303885-c45db2972da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />

                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes">
                                    <span className="visually-hidden">Likes:</span>
                                    <FontAwesomeIcon icon={faHeart} className="me-2" /> 89
                                </li>
                                <li className="gallery-item-comments">
                                    <span className="visually-hidden">Comments:</span>
                                    <FontAwesomeIcon icon={faComment} className="me-2" /> 5
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loader"></div>
        </main>
    );
}
