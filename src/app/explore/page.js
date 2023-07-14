'use client';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faker } from "@faker-js/faker";
import '../css/explore.css';

export default function Explore() {

    return (
        <main>
            <div className="explore-page">
                <div className="hashtag-bar">
                    <div className="hashtag-row">
                        <a href="#">
                            <span>#InstaExplore</span>
                        </a>
                    </div>
                    <div className="hashtag-row">
                        <a href="#">
                            <span>#food photography</span>
                        </a>
                    </div>
                    <div className="hashtag-row">
                        <a href="#">
                            <span>#desk inspo</span>
                        </a>
                    </div>
                    <div className="hashtag-row">
                        <a href="#">
                            <span>#beach day</span>
                        </a>
                    </div>
                    <div className="hashtag-row">
                        <a href="#">
                            <span>#travel</span>
                        </a>
                    </div>
                </div>
                <div className="explore-page">
                    <div className="image-grid">
                        <div className="image-column">
                            <img
                                src={faker.image.url()}
                                alt="Image 1"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 2"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 3"
                                className="image-item"
                            />
                        </div>
                        <div className="image-column">
                            <img
                                src={faker.image.url()}
                                alt="Image 4"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 5"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 6"
                                className="image-item"
                            />
                        </div>
                        <div className="image-column">
                            <img
                                src={faker.image.url()}
                                alt="Image 7"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 8"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 9"
                                className="image-item"
                            />
                        </div>
                        <div className="image-column">
                            <img
                                src={faker.image.url()}
                                alt="Image 7"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 8"
                                className="image-item"
                            />
                        </div>
                        <div className="image-column">
                            <img
                                src={faker.image.url()}
                                alt="Image 4"
                                className="image-item"
                            />
                            <img
                                src={faker.image.url()}
                                alt="Image 5"
                                className="image-item"
                            />
                        </div>
                        <div className="image-column">
                            <img src={faker.image.url()} className="image-item" />
                            <img
                                src={faker.image.url()}
                                alt="Image 8"
                                className="image-item"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}

