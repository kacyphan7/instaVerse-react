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
    const [orderOneComplete, setOrderOneComplete] = useState(false);

    // const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    // let currentTime = Date.now();

    // // make a condition that compares exp and current time
    // if (currentTime >= expirationTime) {
    //     handleLogout();
    //     alert('Session has ended. Please login to continue.');
    //     router.push('/users/login');
    // }

    useEffect(() => {

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${localStorage.getItem('username')}`)
            .then((postsData) => {
                // data is an object
                console.log(postsData.data.posts);
                setOrderOneComplete(true);
                setPosts(postsData.data.posts);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            if (orderOneComplete) {
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                    .then((response) => {
                        // data is an object
                        let userData = jwtDecode(localStorage.getItem('jwtToken'));
                        if (userData.email === localStorage.getItem('email')) {
                            setData(response.data.user);

                            setLoading(false);
                        } else {
                            setTimeout(() => {
                                router.push('/users/login');
                            }, 0);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setTimeout(() => {
                            router.push('/users/login');
                        }, 0);
                    });
            }
        } else {
            setTimeout(() => {
                router.push('/users/login');
            }, 0);
        }
    }, [router, orderOneComplete]);




    const goToPost = () => {
        localStorage.setItem('username', data.username);
        router.push('/post');
    };
    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main>
            <div className="container">
                <div className="profile">
                    <div className="profile-image">
                        <img
                            src={data.profilePicture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                            alt=""
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
                                <a onClick={goToPost} key={data._id}>
                                    <div className='gallery-container'>
                                        <img src={post.photo} className="gallery-image" alt="" onClick={goToPost} />

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
                                </a>
                            );
                        })}
                    </div>


                </div>
            </div>
            <div className="loader"></div>
        </main >
    );
}
