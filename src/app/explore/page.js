import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import "./explore.css";

export default function Explore() {
    return (
        <main>
            <div className="explore-page">
                <div className="hashtag-bar">
                    <a href="#">
                        <span>#InstaExplore</span>
                    </a>
                    <a href="#">
                        <span>#food photography</span>
                    </a>
                    <a href="#">
                        <span>#desk inspo</span>
                    </a>
                    <a href="#">
                        <span>#beach day</span>
                    </a>
                    <a href="#">
                        <span>#travel</span>
                    </a>
                </div>
                <div className="image-grid">
                    <div className="image-column">
                        <img
                            src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 1"
                        />
                        <img
                            src="https://plus.unsplash.com/premium_photo-1679079456784-54204468783f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 2"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1688750771915-64047b2aad5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 3"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src="https://images.unsplash.com/photo-1688904524620-527b42849240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 4"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1583264725407-fd4b17d8e09c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 5"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 6"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src="https://images.unsplash.com/photo-1688759971565-e695af06cc13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 7"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1687890174111-58e5bc5e6bc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 8"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1688684690620-a0863147e965?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 9"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src="https://images.unsplash.com/photo-1687360440102-78d15c3e5045?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 7"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1669940812749-0a0fa4b92ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 8"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNjF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 9"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src="https://images.unsplash.com/photo-1688641204286-16a56438dc5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxODN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 4"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1688759973983-fa77fec09bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 5"
                        />
                    </div>
                    <div className="image-column">
                        <img src="https://images.unsplash.com/photo-1688649102457-4ccb4a27a8c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxODJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <img
                            src="https://images.unsplash.com/photo-1688587723313-350285e8c802?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Image 8"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
