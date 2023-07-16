'use client';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { use } from 'passport';

const MyComponent = ({ posts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [singlePost, setSinglePost] = useState(null);
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
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/id/${selectedPostId}`)
            .then((response) => {
                setSinglePost(response.data.post);
            });
    }, [selectedPostId]);

    return (
        <div>

            <div className="container">
                <div className="gallery">
                    <div className="gallery-item" tabIndex="0"></div>

                    {
                        posts && posts.map((post) => {
                            return (
                                <div key={post._id}>
                                    <button onClick={() => {
                                        setSelectedPostId(post._id);
                                        setIsOpen(true);
                                    }}>
                                        <div className='gallery-container'>
                                            <img src={post.photo} className="gallery-image" alt="" />
                                            <div className='gallery-stuff'>
                                                <ul>
                                                    <li className="gallery-item-likes">
                                                        <span className="visually-hidden">Likes:</span>
                                                        <FontAwesomeIcon icon={faHeart} className="me-2" />{post.likes}
                                                        &nbsp;
                                                        <span className="visually-hidden">Comments:</span>
                                                        <FontAwesomeIcon icon={faComment} className="me-2" />{post.comments.length}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </button >

                                    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                                        <div className="box-body">
                                            <img className="img-responsive pad" src={singlePost.photo} alt="Photo" />
                                            <p className='caption'>{singlePost.caption}</p>
                                            <button type="button" className="btn btn-default btn-xs">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                            <button type="button" className="btn btn-default btn-xs">
                                                <FontAwesomeIcon icon={faComment} />
                                            </button>
                                            <button type="button" className="btn btn-default btn-xs">
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                            </button>
                                            <span className="pull-right text-muted">{singlePost.likes} likes - {singlePost.comments.length} comments</span>
                                        </div>
                                        <button onClick={() => setIsOpen(false)}>Close Modal</button>
                                    </Modal>
                                </div>
                            );
                        })
                    }

                </div>
            </div>


        </div >

    );
};
export default MyComponent;;;