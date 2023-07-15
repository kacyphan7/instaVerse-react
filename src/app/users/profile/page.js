'use client';
import React, { useState, useEffect } from 'react';
import '../../css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import Link from 'next/link';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);

    // const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    // let currentTime = Date.now();

    // // make a condition that compares exp and current time
    // if (currentTime >= expirationTime) {
    //     handleLogout();
    //     alert('Session has ended. Please login to continue.');
    //     router.push('/users/login');
    // }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                .then((response) => {
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setData(response.data.user);
                        setLoading(false);
                    } else {
                        router.push('/users/login');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    router.push('/users/login');
                });
        } else {
            router.push('/users/login');
        }
    }, [router]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${localStorage.getItem('username')}`)
            .then((postsData) => {
                // data is an object
                console.log(postsData.data.posts);
                setPosts(postsData.data.posts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main>
            <div className="container">
                <div className="profile">
                    <div className="profile-image">
                        <img
                            src={data.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"}
                            alt="Profile Image"
                        />
                    </div>

                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">{data.username}</h1>

                        <a href="/users/edit">
                            <button className="btn profile-edit-btn">Edit Profile</button>
                        </a>

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
                                <span className="profile-stat-count">{posts.length || '0'}</span> posts
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
                            <span className="profile-real-name">{data.fullName}</span> {data.bio || ''}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="gallery">
                    <div className="gallery-item" tabIndex="0">
                        {posts.map((post) => {
                            return (
                                <div key={data._id} className='gallery-container'>
                                    <img
                                        src={post.photo}
                                        className="gallery-image"
                                        alt="" />
                                    <div className='gallery-stuff'>
                                        <ul>
                                            <li className="gallery-item-likes">
                                                <span className="visually-hidden">Likes:</span>
                                                <FontAwesomeIcon icon={faHeart} className="me-2" />{post.likes}
                                                &nbsp;
                                                <span className="visually-hidden">Comments:</span>
                                                <FontAwesomeIcon icon={faComment} className="me-2" />2
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* <div className="gallery-item" tabIndex="0">
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
                    </div> */}
                </div>
            </div>
            <div className="loader"></div>
        </main>
    );
}
