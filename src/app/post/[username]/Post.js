'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Comment from '../../comment/Comment';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import moment from 'moment';
import Link from 'next/link';
import '../../css/post.css';

export default function Post({ post }) {
    const dateTimeAgo = moment(new Date(post.updatedAt)).fromNow();
    const router = useRouter();
    const { username } = useParams();
    const [comments, setComments] = useState(post.comments);
    const [commentBody, setCommentBody] = useState('');
    const [currentUserData, setCurrentUserData] = useState(null);
    const [isLoading, setLoading] = useState(true);


    const commentRows = [];
    if (comments.length) {
        comments.forEach((comment) => {
            commentRows.push(<Comment comment={comment} key={comment._id} />);
        });
    } else { }

    const handleCommentBody = (e) => {
        setCommentBody(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('comment', comments, 'username', username);
        const newComment = { username, comment: commentBody };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post._id}/comments/new`, newComment)
            .then(response => {
                setCommentBody('');
                setComments(response.data.post.comments);
            });

    };
    useEffect(() => {
        if (typeof window !== undefined) {
            if (localStorage.getItem('jwtToken')) {
                setAuthToken(localStorage.getItem('jwtToken'));
            }
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                .then((response) => {
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}`)
                            .then((response) => {
                                // data is an object
                                setCurrentUserData(response.data.user);
                                setLoading(false);
                            });
                    } else {
                        console.log('error1', error);
                        router.push('/users/login');

                    }
                })
                .catch((error) => {
                    console.log('error2', error);

                    router.push('/users/login');

                });

        } else {
            console.log('error3', error);
            router.push('/users/login');

        }
    }, [router, username]);

    if (isLoading) return <p>Loading...</p>;
    if (!currentUserData) return <p>No data shown...</p>;

    return (
        <div className="row container d-flex justify-content-center">
            <div className="box box-widget">
                <div className="box-header with-border ">
                    <div className="user-block">
                        <br />
                        <img src={currentUserData.profilePicture} />
                        <span className="username">
                            <Link href={"/users/profile/" + currentUserData.username} >
                                {currentUserData.username}
                            </Link>
                        </span>
                        <span className="description">{dateTimeAgo}</span>
                    </div>
                    <div className="box-tools">
                        <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="" data-original-title="Mark as read">
                            <i className="fa fa-circle-o"></i>
                        </button>
                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                            <i className="fa fa-minus"></i>
                        </button>
                        <button type="button" className="btn btn-box-tool" data-widget="remove">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div className="box-body">
                    <img className="img-responsive pad" src={post.photo} alt="Photo" />
                    <p className='caption'>{post.caption}</p>
                    <button type="button" className="btn btn-default btn-xs">
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button type="button" className="btn btn-default btn-xs">
                        <FontAwesomeIcon icon={faComment} />
                    </button>
                    <button type="button" className="btn btn-default btn-xs">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                    <span className="pull-right text-muted">{post.likes} likes - {post.comments.length} comments</span>
                </div>
                {commentRows}

                <div className="box-footer">

                    <form onSubmit={handleSubmit}>
                        <img className="img-responsive img-circle img-sm"
                            src={currentUserData.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                            alt="Alt Text" />
                        <div className="img-push">
                            <input type="text" name='comment' value={commentBody} onChange={handleCommentBody} className="form-control input-sm" placeholder="Add a comment..." />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

