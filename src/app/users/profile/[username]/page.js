'use client';
import React, { useState, useEffect, useMemo } from 'react';
import '../../../css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import { useRouter, useParams } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import Link from 'next/link';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';
import Modal from 'react-modal';
import Comment from '@/app/comment/Comment';
import { use } from 'passport';
import moment from 'moment';


export default function FilterablePostTable() {

    // Modal.setAppElement('el');

    const [data, setData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [orderOneComplete, setOrderOneComplete] = useState(true);
    const [orderTwoComplete, setOrderTwoComplete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const router = useRouter();
    const { username } = useParams();
    const [singlePost, setSinglePost] = useState(null);
    const [comments, setComments] = useState(0);
    const [commentBody, setCommentBody] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);



    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
            width: '1800px',
            height: '100%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: '-30%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const commentRows = [];


    if (comments.length) {
        comments.forEach((comment) => {
            commentRows.push(<Comment comment={comment} userInfo={loggedInUser} key={comment._id} />);
        });
    } else {
        commentRows.push([]);
    }


    const handleCommentBody = (e) => {
        setCommentBody(e.target.value);
    };

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (orderOneComplete) {
            if (localStorage.getItem('jwtToken')) {
                axios
                    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                    .then((response) => {
                        setLoggedInUser(response.data.user);
                        let userData = jwtDecode(localStorage.getItem('jwtToken'));
                        if (userData.email === localStorage.getItem('email')) {
                            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}`)
                                .then((response) => {
                                    setUserInfo(response.data.user);
                                    setLoading(false);
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

    // useEffect(() => {
    //     if (selectedPostId) {
    //         axios
    //             .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}/posts/id/${selectedPostId}`)
    //             .then((response) => {
    //                 setSinglePost(response.data.post);
    //             });
    //     }
    // }, [selectedPostId, username]);

    const handleOpenModal = (postId) => {
        setSelectedPostId(postId);
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}/posts/id/${postId}`)
            .then((response) => {
                setSinglePost(response.data.post);
                setComments(response.data.post.comments);
            });
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPostId(null);
        setIsOpen(false);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentBody) {
            const newComment = { username: loggedInUser.username, comment: commentBody };
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}/posts/${selectedPostId}/comments/new`, newComment)
                .then(response => {
                    setCommentBody('');
                    setSinglePost(response.data.post);
                    setComments(response.data.post.comments);

                })
                .catch(error => console.log('===> Error in Adding comment', error));
        } else {
            console.log('need to input something');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!userInfo) return <p>No data shown...</p>;

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
                                            {userInfo.posts && userInfo.posts.length ? userInfo.posts.length : '0'}
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
                            {userInfo.posts.map((post) => (
                                <div key={post._id}>
                                    <button onClick={() => handleOpenModal(post._id)}>
                                        <div className="gallery-container">
                                            <img src={post.photo} className="gallery-image" alt="" />
                                            <div className="gallery-stuff">
                                                <ul>
                                                    <li className="gallery-item-likes white-icon">
                                                        <span className="visually-hidden" >Likes:</span>
                                                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                                                        {post.likes > 0 ? post.likes : 0}
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className="visually-hidden">Comments:</span>
                                                        <FontAwesomeIcon icon={faComment} className="me-2n" />
                                                        &nbsp;{post.comments.length}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
                        {singlePost && (
                            <div style={{ display: 'inline-flex', fontSize: '15px' }}>
                                <div style={{ display: 'flex', width: '1300px' }}>
                                    <img className="img-responsive pad" src={singlePost.photo} alt="Photo" style={{ width: '100%' }} />
                                </div>
                                &nbsp;
                                &nbsp;
                                <hr />
                                <div className="box-body" style={{ position: 'absolute', right: '0', width: '25%' }}>
                                    <div style={{ display: 'inline-flex' }}>
                                        <img src={userInfo.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                                            alt="Profile Image"
                                            style={{ width: '30px' }} />&nbsp;
                                        <a href={'/users/profile/' + singlePost.username} >{singlePost.username}</a>
                                    </div>
                                    <hr />
                                    <div style={{ display: 'inline-flex' }}>
                                        {singlePost.caption}
                                    </div>
                                    <hr />
                                    {/* {singlePostDateTimeAgo} */}

                                    <div>
                                        {commentRows}
                                    </div>
                                    <div>
                                        <hr />
                                        <button type="button" className="btn btn-default btn-xs">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                        &nbsp;
                                        <button type="button" className="btn btn-default btn-xs">
                                            <FontAwesomeIcon icon={faComment} />
                                        </button>
                                        &nbsp;
                                        <button type="button" className="btn btn-default btn-xs">
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </button>
                                        &nbsp;
                                        <span className="pull-right text-muted">
                                            {singlePost.likes} likes - {singlePost.comments.length} comments
                                        </span>
                                        <hr />
                                        <form onSubmit={handleCommentSubmit}>
                                            <div className='form-group'>
                                                <textarea type="text" name="body" value={commentBody} onChange={handleCommentBody} className="input is-link form-control textarea" placeholder='Add a comment...' />
                                            </div>
                                            <button type="submit" className='button'>post comment</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        )}
                        <button onClick={handleCloseModal}></button>
                    </Modal>
                </div>
            )}
        </main>
    );
}
