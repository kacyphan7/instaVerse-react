'use client';
import './globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function Rightbar() {
    return (

        <div className="rightbar d-flex flex flex-column flex-shrink-0 p-3 text-white">
            < a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" >
                <svg className="bi me-2" width="40" height="32"></svg>
                <span className="fs-4">InstaVerse</span>
            </a >
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faSearch} className="me-2" />
                        Search
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faCompass} className="me-2" />
                        Explore
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
                        Reels
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faComment} className="me-2" />
                        Messages
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                        Notifications
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faPlusSquare} className="me-2" />
                        Create
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                        Profile
                    </a>
                </li>
            </ul>
        </div>

    );
}
