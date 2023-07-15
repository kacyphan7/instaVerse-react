'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { faker } from "@faker-js/faker";
export default function Comment({ comment }) {

    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${comment.username}`)
            .then((response) => {
                // data is an object
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, [router, comment.username]);




    return (
        <div className="box-footer box-comments">
            <div className="box-comment">

                <div className="comment-text">
                    <p>
                        <img src={userData.profilePicture} />
                        <strong>{comment.username}</strong>
                        <br />
                        {comment.comment}
                        <br />
                        {comment.likes}
                    </p>

                </div>
            </div>
        </div>
        // <article className="media">
        //     <figure className="media-left">
        //         <p className="image is-48x48">
        //             <img src={faker.image.avatar()} />
        //         </p>
        //     </figure>
        //     <div className="media-content">
        //         <div className="content">
        //             <p>
        //                 <img src={userData.profilePicture} />
        //                 <strong>{comment.username}</strong>
        //                 <br />
        //                 {comment.comment}
        //                 <br />
        //                 {comment.likes}
        //             </p>
        //         </div>
        //     </div>
        // </article>

    );
}
