import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Comment from '../comment/new/page';
import { faker } from '@faker-js/faker';
import setAuthToken from './utils/setAuthToken';

export default function Post({ post }) {
    const rows = [];
    if (post.comments.length) {
        post.comments.forEach((comment) => {
            rows.push(<Comment comment={comment} key={comment._id} />);
        });
    }

    setAuthToken(localStorage.getItem('jwtToken'));
    return (
        <div className="row container d-flex justify-content-center">
            <div>
                {data.map((user, index) => (
                    <div key={index}>
                        <div className="box box-widget">
                            <div className="box-header with-border ">
                                <div className="user-block">
                                    <br />
                                    <img src={faker.image.avatar()} />
                                    <span className="username">
                                        <a href="#" data-abc="true">
                                            {user.username}
                                        </a>
                                    </span>
                                    <span className="description">Public - 7:30 PM Today</span>
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
                                <img className="img-responsive pad" src={faker.image.url()} alt="Photo" />
                                <p>Look at the beach photo I clicked</p>
                                <button type="button" className="btn btn-default btn-xs">
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                                <button type="button" className="btn btn-default btn-xs">
                                    <FontAwesomeIcon icon={faComment} />
                                </button>
                                <button type="button" className="btn btn-default btn-xs">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                                <span className="pull-right text-muted">127 likes - 3 comments</span>
                            </div>
                            <div className="box-footer box-comments">
                                <div className="box-comment">
                                    <img className="img-circle img-sm" src={faker.image.avatar()} alt="User Image" />
                                    <div className="comment-text">
                                        <span className="username">
                                            {user.username}
                                            <span className="text-muted pull-right">8:03 PM Today</span>
                                        </span>
                                        For what reason would it be advisable for me to think about business content?
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <form action="#" method="post">
                                    <img
                                        className="img-responsive img-circle img-sm"
                                        src={data.profilePicture || 'https://freesvg.org/img/abstract-user-flat-4.png'}
                                        alt="Alt Text"
                                    />
                                    <div className="img-push">
                                        <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
