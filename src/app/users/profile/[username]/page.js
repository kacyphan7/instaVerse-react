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
import Modal from 'react-modal';

export default function FilterablePostTable() {
    const [data, setData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [orderOneComplete, setOrderOneComplete] = useState(false);
    const [orderTwoComplete, setOrderTwoComplete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [singlePost, setSinglePost] = useState(null);
    const router = useRouter();
    const { username } = useParams();

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/username/${username}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                setOrderOneComplete(true);
            });
    }, [username]);

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (orderOneComplete) {
            if (localStorage.getItem('jwtToken')) {
                axios
                    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                    .then((response) => {
                        let userData = jwtDecode(localStorage.getItem('jwtToken'));
                        if (userData.email === localStorage.getItem('email')) {
                            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}`)
                                .then((response) => {
                                    setUserInfo(response.data.user);
                                    setOrderTwoComplete(true);
                                });
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
            } else {
                setTimeout(() => {
                    router.push('/users/login');
                }, 0);
            }
        }
    }, [router, username, orderOneComplete]);

    useEffect(() => {
        if (selectedPostId) {
            axios
                .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/id/${selectedPostId}`)
                .then((response) => {
                    setSinglePost(response.data.post);
                });
        }
    }, [selectedPostId]);

    const handleOpenModal = (postId) => {
        setSelectedPostId(postId);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPostId(null);
        setIsOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <main className="post-center">
            {orderTwoComplete && (
                <div>
                    <div className="container">
                        <div className="profile">
                            <div className="profile-image">
                                <img
                                    src={userInfo.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                                    alt="Profile Image"
                                />
                            </div>

                            <div className="profile-user-settings">
                                {localStorage.getItem('username') === username ? (
                                    <div>
                                        <h1 className="profile-user-name">{username}</h1>
                                        <a href="/users/edit">
                                            <button className="btn profile-edit-btn">Edit Profile</button>
                                        </a>
                                        <button className="btn profile-settings-btn" aria-label="profile settings">
                                            <FontAwesomeIcon icon={faCog} className="me-2" />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="profile-user-settings">
                                            <h1 className="profile-user-name">{username}</h1>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="profile-stats">
                                <ul>
                                    <li>
                                        <span className="profile-stat-count">
                                            {data.posts && data.posts.length ? data.posts.length : '0'}
                                        </span>
                                        posts
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

                    <div className="container">
                        <div className="gallery">
                            {data.posts.map((post) => (
                                <div key={post._id}>
                                    <button onClick={() => handleOpenModal(post._id)}>
                                        <div className="gallery-container">
                                            <img src={post.photo} className="gallery-image" alt="" />
                                            <div className="gallery-stuff">
                                                <ul>
                                                    <li className="gallery-item-likes">
                                                        <span className="visually-hidden">Likes:</span>
                                                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                                                        {post.likes}
                                                        &nbsp;
                                                        <span className="visually-hidden">Comments:</span>
                                                        <FontAwesomeIcon icon={faComment} className="me-2" />
                                                        {post.comments.length}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
                        {singlePost && (
                            <div className="box-body">
                                <img className="img-responsive pad" src={singlePost.photo} alt="Photo" />
                                <p className="caption">{singlePost.caption}</p>
                                <button type="button" className="btn btn-default btn-xs">
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                                <button type="button" className="btn btn-default btn-xs">
                                    <FontAwesomeIcon icon={faComment} />
                                </button>
                                <button type="button" className="btn btn-default btn-xs">
                                    {/* <FontAwesomeIcon icon={faPaperPlane} /> */}
                                </button>
                                <span className="pull-right text-muted">
                                    {singlePost.likes} likes - {singlePost.comments.length} comments
                                </span>
                            </div>
                        )}
                        <button onClick={handleCloseModal}>Close Modal</button>
                    </Modal>
                </div>
            )}
        </main>
    );
}
