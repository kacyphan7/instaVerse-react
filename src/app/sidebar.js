'use client';
import './globals.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    return (
        <div className="sidenav d-flex flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            < a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" >
                <svg className="bi me-2" width="40" height="32"></svg>
                <span className="fs-4">InstaVerse</span>
            </a >
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/" className="nav-link active" aria-current="page">
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
                    <a href="/users/profile" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="16"></svg>
                        <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                        Profile
                    </a>
                </li>
            </ul>
            <hr />

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    <FontAwesomeIcon icon={faBars} className="me-2" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <Dropdown.Item href="#/action-1">
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Setting
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Your activity
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        <FontAwesomeIcon icon={faBookmark} className="me-2" />
                        Saved
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        <FontAwesomeIcon icon={faSun} className="me-2" />
                        Switch appearance
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        Report a problem
                    </Dropdown.Item>
                    <hr></hr>
                    <Dropdown.Item href="#/action-3">Switch accounts</Dropdown.Item>
                    <hr></hr>
                    <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



            {/* <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div> */}

        </div >
    );
}
