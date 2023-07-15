'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Comment from '../comment/new/page';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import moment from 'moment';
import '../css/post.css';

export default function Post({ post }) {
    const dateTimeAgo = moment(new Date(post.updatedAt)).fromNow();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const commentRows = [];
    if (post.comments.length) {
        post.comments.forEach((comment) => {
            commentRows.push(<Comment comment={comment} key={comment._id} />);
        });
    } else { }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {

            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${localStorage.getItem('userId')}`)
                .then((response) => {
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setUserData(response.data.user);
                        setLoading(false);
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
    }, [router]);

    if (isLoading) return <p>Loading...</p>;
    if (!userData) return <p>No data shown...</p>;

    // setAuthToken(localStorage.getItem('jwtToken'));
    return (
        <div className="row container d-flex justify-content-center">

            {/* {data.map((user, index) => ( */}
            {/* <div key={index}> */}

            <div className="box box-widget">
                <div className="box-header with-border ">
                    <div className="user-block">
                        <br />
                        <img src={userData.profilePicture} />
                        <span className="username">
                            <a href="#" data-abc="true">
                                {/* {user.username} */}
                            </a>
                        </span>
                        <span className="description">Public - {dateTimeAgo}</span>
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
                    <form action="#" method="post">
                        <img
                            className="img-responsive img-circle img-sm"
                            src={userData.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                            alt="Alt Text"
                        />
                        <div className="img-push">
                            <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
                        </div>
                    </form>
                </div>
            </div>

            {/* ))} */}

        </div>
    );
}

