'use client';
import React, { useState, useEffect, useMemo } from 'react';
import '../../../css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faComment as regularComment } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane as regularPlane } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';
import Modal from 'react-modal';
import Comment from '@/app/comment/Comment';
import moment from 'moment';
import ModalManager from '@/app/post/new/modalManager';
import LikeButton from './postLikes';
import DropdownSelect from 'react-dropdown-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingCircle } from '@/app/components/Loading';


export default function FilterablePostTable() {

    const [data, setData] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [orderOneComplete, setOrderOneComplete] = useState(true);
    const [orderTwoComplete, setOrderTwoComplete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const router = useRouter();
    const { userId } = useParams();
    const [singlePost, setSinglePost] = useState(null);
    const [comments, setComments] = useState(0);
    const [commentBody, setCommentBody] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [menuOptions, setMenuOptions] = useState([]);


    let posts = [];

    const handleDeletePost = (postId) => {
        // Check to see if the post exists
        const post = posts.find((post) => post._id === postId);
        console.log('Post found:', post);
        const postIndex = posts.findIndex((post) => post._id === postId);
        if (postIndex !== -1) {
            // Remove the post from the posts array
            const updatedPosts = [...posts];
            updatedPosts.splice(postIndex, 1);
            setSelectedPostId(null); // Clear the selected post ID
        }

        // Make an API request to delete the post
        if (typeof window !== 'undefined') {
            setAuthToken(localStorage.getItem('jwtToken'));
            axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}`)
                .then((response) => {
                    // Handle the post deletion, for example, remove the deleted post from the data array.
                    posts = posts.filter((post) => post._id !== postId); // Use postId here
                    setSelectedPostId(null); // Clear the selected post ID
                    // Show the popup notification
                    toast.success('Post has been deleted. Please refresh the page to see the changes.');
                })
                .catch((error) => {
                    console.log('Error deleting post:', error);
                })
                .finally(() => {
                    setIsDeleting(false); // Reset the isDeleting state after the request is complete
                });
        }
    };

    // Define deletePostMenuOptions here
    const deletePost = (postId) => {
        // Make an API request to delete the post
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${postId}`)
            .then((response) => {
                // Handle the post deletion, for example, remove the deleted post from the data array.
                posts = posts.filter((post) => post._id !== postId); // Use postId here
                setSelectedPostId(null); // Clear the selected post ID
            })
            .catch((error) => {
                console.log('Error deleting post:', error);
            })
            .finally(() => {
                setIsDeleting(false); // Reset the isDeleting state after the request is complete
            });
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            overflowY: 'hidden'
        },
        content: {
            width: '1200px',
            height: '68%',
            top: '50%',
            left: '50%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden'
        }
    };
    const [followingData, setFollowingData] = useState([]);
    const [followerData, setFollowerData] = useState([]);
    const [isModalManagerOpen, setModalManagerOpen] = useState(false);
    const handleOpenModalManager = () => {
        setModalManagerOpen(true);
    };

    const commentRows = [];

    if (comments.length) {
        comments.forEach((comment) => {
            commentRows.push(<Comment postId={singlePost._id} comment={comment} userInfo={loggedInUser} key={comment._id} />);
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
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                    .then((response) => {
                        setLoggedInUser(response.data.user);
                        let userData = jwtDecode(localStorage.getItem('jwtToken'));
                        if (userData.email === localStorage.getItem('email')) {
                            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`)
                                .then((response) => {
                                    setUserInfo(response.data.user);
                                    setLoading(false);
                                    setOrderTwoComplete(true);
                                    // console.log('response.data.user', response.data.user);
                                    const userInfoId = response.data.user._id;
                                    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${userInfoId}`)
                                        .then((response) => {
                                            setData(response.data.posts.reverse());
                                            // Check if deletePostMenuOptions is already in menuOptions before adding it
                                            setMenuOptions([
                                                {
                                                    label: 'Delete Post',
                                                    action: handleDeletePost,
                                                    isMenuOpen: false,
                                                },
                                            ]);
                                            setOrderOneComplete(false);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            setTimeout(() => {
                                                router.push('/users/login');
                                            }, 0);
                                        });
                                });
                        } else {
                            setTimeout(() => {
                                router.push('/users/login');
                            }, 0);
                        }
                    });
            } else {
                setTimeout(() => {
                    router.push('/users/login');
                }, 0);
            }
        }
    }, [router, userId, orderOneComplete, loggedInUser, handleDeletePost]);
    const [singlePostDateTimeAgo, setSinglePostDateTimeAgo] = useState('');

    const handleOpenModal = (postId) => {
        setSelectedPostId(postId);
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/post/${postId}`)
            .then((response) => {
                setSinglePost(response.data.post);
                setComments(response.data.post.comments);
                setSinglePostDateTimeAgo(moment(new Date(response.data.post.createdAt)).fromNow());
            });
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPostId(null);
        setIsOpen(false);
    };

    const handleUpdateLikes = (updatedLikes) => {
        // Update the singlePost likes with the new data received from the LikeButton
        setSinglePost((prevPost) => ({
            ...prevPost,
            likes: updatedLikes,
        }));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentBody) {
            const newComment = { createdBy: loggedInUser._id, comment: commentBody };
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${selectedPostId}/comments/new`, newComment)
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

    const handleFollower = (e) => {
        e.preventDefault();
        console.log('handleFollower');
        const newFollower = { userId: userId, follower: loggedInUser._id };
        const newFollowing = { userId: loggedInUser._id, following: userId };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/followers/`, newFollower)
            .then(response => {
                axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings/`, newFollowing)
                    .then(response => {
                    })
                    .catch(error => console.log('===> Error in Adding following', error));
            })
            .catch(error => console.log('===> Error in Adding follower', error));
    };

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings/${userId}`)
            .then(followingResponse => {
                setFollowingData(followingResponse.data.following[0].following);
            })
            .catch((error) => {
                console.log(error);
            }
            );
    }, [userId]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followers/${userId}`)
            .then(followerResponse => {
                setFollowerData(followerResponse.data.follower[0].follower);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);

    if (isLoading) return <LoadingCircle />;
    if (!userInfo) return <p>No data shown...</p>;
    if (isDeleting) return <p>Post has been deleted...</p>;

    return (
        <main className="profile-center">
            {orderTwoComplete && (
                <div>
                    <div className="container-profile">
                        <div className="profile">
                            <div className="profile-image">
                                <img
                                    src={userInfo.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                                    alt="Profile Image" className='avatar-img'
                                />
                            </div>

                            <div className="profile-user-settings">
                                {localStorage.getItem('userId') === userId ? (
                                    <div>
                                        <h1 className="profile-user-name">{userInfo.username}</h1>
                                        <a href="/users/edit">
                                            <button className="btn profile-edit-btn"><h4>Edit Profile</h4></button>
                                        </a>
                                        <button className="btns profile-settings-btn" aria-label="profile settings">
                                            <FontAwesomeIcon icon={faCog} className="me-2" />
                                        </button>
                                    </div>
                                ) : (

                                    <form onSubmit={handleFollower}>
                                        <div className="profile-user-settings">
                                            <h1 className="profile-user-name">{userInfo.username}</h1>
                                            <button type='submit' className="profile-edit-btn">Follow</button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="profile-stats">
                                <ul style={{ padding: '0' }}>
                                    <li>
                                        <span className="profile-stat-count">
                                            {data && data.length ? data.length : '0'}
                                        </span>
                                        &nbsp;posts
                                    </li>
                                    <li>
                                        <span className="profile-stat-count">{followerData.length}</span> followers
                                    </li>
                                    <li>
                                        <a href={'/users/following/' + userId}><span className="profile-stat-count">{followingData.length}</span> following</a>
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

                    <div className="container-post">
                        <hr />
                        <br />
                        <div className="profile-gallery">
                            {data.length ? data.map((post) => (
                                <div key={post._id}>
                                    <button onClick={() => handleOpenModal(post._id)}>
                                        <div className="gallery-container">
                                            <img src={post.photo} className="gallery-image" alt="" />
                                            <div className="gallery-stuff">
                                                <ul>
                                                    <li className="gallery-item-likes white-icon">
                                                        <span className="visually-hidden" >Likes:</span>
                                                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                                                        {post.likes.length > 0 ? post.likes.length : 0}
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
                            )) :
                                <div className="gallery-container nopost-title">
                                    <FontAwesomeIcon icon={faCamera} flip size="xl" />
                                    <div>
                                        Share Photos
                                    </div>
                                    <div className='nopost-sub-title'>
                                        when you share photos, they will appear on your profile.
                                    </div>
                                    <div >
                                        <a onClick={handleOpenModalManager}>
                                            <div className="nopost-sub-title">Share your first photo</div>
                                        </a>
                                    </div>
                                    <ModalManager isOpen={isModalManagerOpen} onClose={() => setModalManagerOpen(false)} />
                                </div>
                            }
                        </div>
                    </div>

                    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
                        {singlePost && (
                            <div style={{ display: 'inline-flex', fontSize: '15px' }}>
                                <div style={{ display: 'flex', width: '850px' }}>
                                    <img className="img-responsive pad" src={singlePost.photo} alt="Photo" style={{ width: '100%' }} />
                                </div>
                                &nbsp;
                                &nbsp;
                                <hr />
                                <div className="modal-comment-style" >
                                    <div>
                                        <div style={{ display: 'inline-flex' }}>
                                            <img src={userInfo.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                                                alt="Profile Image"
                                                style={{ width: '30px', height: '30px' }} />&nbsp;
                                            <a href={'/users/profile/' + userInfo._id} >{userInfo.username}</a>
                                            <DropdownSelect
                                                options={menuOptions.map((option) => ({
                                                    label: option.label,
                                                    value: option.label,
                                                }))}
                                                values={[]} // You might need to set the initial value based on the selected post.
                                                closeOnSelect
                                                onChange={(values) => {
                                                    console.log('Selected values:', values);
                                                    // Find the selected option based on the selected value
                                                    const selectedOption = menuOptions.find((option) => option.label === values[0]?.label);
                                                    console.log('Selected option:', selectedOption);
                                                    if (selectedOption && selectedOption.label === 'Delete Post') {
                                                        handleDeletePost(selectedPostId); // Pass the postId here

                                                        // Update the menuOptions state to close the dropdown after selecting 'Delete Post'
                                                        setMenuOptions((prevOptions) =>
                                                            prevOptions.map((option) =>
                                                                option.label === 'Delete Post'
                                                                    ? { ...option, isMenuOpen: false } // Close the dropdown for 'Delete Post'
                                                                    : option
                                                            )
                                                        );
                                                    }
                                                }}
                                                isOpen={menuOptions.find((option) => option.isMenuOpen)}
                                                className="menu-dropdown"
                                            >
                                            </DropdownSelect>
                                        </div>

                                        <hr />
                                        <div style={{ display: 'inline-flex', width: '100%' }}>
                                            {singlePost.caption}
                                        </div>
                                        <hr />

                                        <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
                                            {commentRows}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="instagram-post-actions" >
                                            <hr />
                                            <div style={{ display: 'inline-flex', }}>
                                                <LikeButton
                                                    postId={singlePost._id}
                                                    loggedInUser={loggedInUser}
                                                    likes={singlePost.likes}
                                                    handleUpdateLikes={handleUpdateLikes}
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                                <button type="button" className="btn btn-default btn-xs">
                                                    <FontAwesomeIcon icon={regularComment} size='xl' flip='horizontal' className='icon-style' />
                                                </button>
                                                &nbsp;&nbsp;&nbsp;
                                                <button type="button" className="btn btn-default btn-xs">
                                                    <FontAwesomeIcon icon={regularPlane} size='xl' className='icon-style' />
                                                </button>
                                                &nbsp;

                                            </div>
                                            <div>
                                                <span className="pull-right text-muted">
                                                    {singlePost.likes.length} likes - {singlePost.comments.length} comments
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '10px' }}>
                                                {singlePostDateTimeAgo}
                                            </div>
                                            <hr />
                                            <form onSubmit={handleCommentSubmit}>
                                                <div className='form-group'>
                                                    <textarea
                                                        type="text"
                                                        name="body"
                                                        value={commentBody}
                                                        onChange={handleCommentBody}
                                                        className="input is-link form-control textarea"
                                                        placeholder='Add a comment...'
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                                <button type="submit" className="button btn btn-primary">
                                                    Post
                                                </button>
                                            </form>
                                            <br />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                        <button onClick={handleCloseModal}></button>
                    </Modal>
                </div>
            )}
            <div>
                <ToastContainer position="top-center" autoClose={3000} />
            </div>
        </main>
    );
};