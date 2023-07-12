import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import "./search.css";

export default function Explore() {
    return (
        <main>
            <div className="explore-page">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
            </div>
        </main>
    );
}
