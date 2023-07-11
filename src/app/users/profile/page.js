'use client';
import React, { useState, useEffect } from 'react';
import '../../profile.css';

export default function Profile() {
    // state is what the data is representing in realtime
    /* const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
            .then((res) => res.json())
            .then((data) => {
                // data is an object
                console.log('--- found user ---', data.user[0]);
                setData(data.user[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>; */

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="media align-items-end profile-head">
                    <div className="profile mr-3">
                        <img
                            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                            alt="..."
                            width="130"
                            className="rounded-circle mb-2 img-thumbnail"
                        />
                        <a href="#" className="btn btn-outline-dark btn-sm btn-block">
                            Edit profile
                        </a>
                    </div>
                    <div className="media-body mb-5 text-black">
                        <h4 className="mt-0 mb-0">Mark Williams</h4>
                    </div>
                </div>

                <div className="bg-light p-4 d-flex justify-content-end text-center">
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                            <h5 className="font-weight-bold mb-0 d-block">215</h5>
                            <small className="text-muted">
                                <i className="fas fa-image mr-1"></i>Photos
                            </small>
                        </li>
                        <li className="list-inline-item">
                            <h5 className="font-weight-bold mb-0 d-block">745</h5>
                            <small className="text-muted">
                                <i className="fas fa-user mr-1"></i>Followers
                            </small>
                        </li>
                        <li className="list-inline-item">
                            <h5 className="font-weight-bold mb-0 d-block">340</h5>
                            <small className="text-muted">
                                <i className="fas fa-user mr-1"></i>Following
                            </small>
                        </li>
                    </ul>
                </div>
                <div className="px-4 py-3">
                    <h5 className="mb-0">About</h5>
                    <div className="p-4 rounded shadow-sm bg-light">
                        <p className="font-italic mb-0">Web Developer</p>
                        <p className="font-italic mb-0">Lives in New York</p>
                        <p className="font-italic mb-0">Photographer</p>
                    </div>
                </div>
                <div className="py-4 px-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="mb-0">Recent photos</h5>
                        <a href="#" className="btn btn-link text-muted">
                            Show all
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-2 pr-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                alt=""
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                        <div className="col-lg-6 mb-2 pl-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                alt=""
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                        <div className="col-lg-6 pr-lg-1 mb-2">
                            <img
                                src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                                alt=""
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                        <div className="col-lg-6 pl-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                alt=""
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
