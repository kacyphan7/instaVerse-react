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
        <main>
            <div class="container">
                <div class="profile">
                    <div class="profile-image">
                        <img
                            src="https://images.unsplash.com/photo-1682685797741-f0213d24418c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzOTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=150&q=60w=152&h=152&fit=crop&crop=faces"
                            alt=""
                        />
                    </div>

                    <div class="profile-user-settings">
                        <h1 class="profile-user-name">bobdoe_</h1>

                        <button class="btn profile-edit-btn">Edit Profile</button>

                        <button
                            class="btn profile-settings-btn"
                            aria-label="profile settings"
                        >
                            <i class="fas fa-cog" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="profile-stats">
                        <ul>
                            <li>
                                <span class="profile-stat-count">164</span> posts
                            </li>
                            <li>
                                <span class="profile-stat-count">188</span> followers
                            </li>
                            <li>
                                <span class="profile-stat-count">206</span> following
                            </li>
                        </ul>
                    </div>

                    <div class="profile-bio">
                        <p>
                            <span class="profile-real-name">Bob Doe</span> Lorem ipsum dolor
                            sit, amet consectetur adipisicing elit 📷✈️🏕️
                        </p>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="gallery">
                    <div class="gallery-item" tabindex="0">
                        <img
                            src="https://images.unsplash.com/photo-1663573794485-6203eef8e30a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80w=500&h=500&fit=crop"
                            class="gallery-image"
                            alt=""
                        />

                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes">
                                    <span class="visually-hidden">Likes:</span>
                                    <i class="fas fa-heart" aria-hidden="true"></i> 56
                                </li>
                                <li class="gallery-item-comments">
                                    <span class="visually-hidden">Comments:</span>
                                    <i class="fas fa-comment" aria-hidden="true"></i> 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="gallery-item" tabindex="0">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1686878940830-9031355ec98c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            class="gallery-image"
                            alt=""
                        />

                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes">
                                    <span class="visually-hidden">Likes:</span>
                                    <i class="fas fa-heart" aria-hidden="true"></i> 89
                                </li>
                                <li class="gallery-item-comments">
                                    <span class="visually-hidden">Comments:</span>
                                    <i class="fas fa-comment" aria-hidden="true"></i> 5
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="gallery-item" tabindex="0">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1682390303366-7463dcbec281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyODR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            class="gallery-image"
                            alt=""
                        />

                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes">
                                    <span class="visually-hidden">Likes:</span>
                                    <i class="fas fa-heart" aria-hidden="true"></i> 56
                                </li>
                                <li class="gallery-item-comments">
                                    <span class="visually-hidden">Comments:</span>
                                    <i class="fas fa-comment" aria-hidden="true"></i> 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="gallery-item" tabindex="0">
                        <img
                            src="https://images.unsplash.com/photo-1688876100196-23fe0b1efb84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            class="gallery-image"
                            alt=""
                        />

                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes">
                                    <span class="visually-hidden">Likes:</span>
                                    <i class="fas fa-heart" aria-hidden="true"></i> 89
                                </li>
                                <li class="gallery-item-comments">
                                    <span class="visually-hidden">Comments:</span>
                                    <i class="fas fa-comment" aria-hidden="true"></i> 5
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="gallery-item" tabindex="0">
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            class="gallery-image"
                            alt=""
                        />

                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes">
                                    <span class="visually-hidden">Likes:</span>
                                    <i class="fas fa-heart" aria-hidden="true"></i> 56
                                </li>
                                <li class="gallery-item-comments">
                                    <span class="visually-hidden">Comments:</span>
                                    <i class="fas fa-comment" aria-hidden="true"></i> 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="gallery-item" tabindex="0">
                        <img
                            src="https://images.unsplash.com/photo-1688380303885-c45db2972da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60w=500&h=500&fit=crop"
                            class="gallery-image"
                            alt=""
                        />

                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes">
                                    <span class="visually-hidden">Likes:</span>
                                    <i class="fas fa-heart" aria-hidden="true"></i> 89
                                </li>
                                <li class="gallery-item-comments">
                                    <span class="visually-hidden">Comments:</span>
                                    <i class="fas fa-comment" aria-hidden="true"></i> 5
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loader"></div>
        </main>
    );
}
