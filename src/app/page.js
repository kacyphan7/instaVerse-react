'use client';
// import Image from 'next/image';
// import 'bootstrap/dist/css/bootstrap.css';
//import './globals.css';
import './css/post.css';
import './css/home.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faker } from "@faker-js/faker";
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios';
import handleLogout from './utils/handleLogout';
import Explore from './explore/page';
import Link from 'next/link';
import Search from './search/page';
import { use } from 'passport';
import moment from 'moment';

export default function Homepage() {

  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [following, setFollowing] = useState(0);
  const [followingPostData, setFollowingPostData] = useState([]);



  useEffect(() => {
    if (typeof window !== undefined) {
      const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
      let currentTime = Date.now();

      setAuthToken(localStorage.getItem('jwtToken'));
      // make a condition that compares exp and current time
      if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
      }
    }
  }, [router]);

  useEffect(() => {
    setAuthToken(localStorage.getItem('jwtToken'));
    if (localStorage.getItem('jwtToken')) {
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
        .then((response) => {
          // data is an object
          // console.log('response', response.data);
          let userData = jwtDecode(localStorage.getItem('jwtToken'));
          if (userData.email === localStorage.getItem('email')) {
            setData(response.data.users);
            setLoading(false);
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/followings/${localStorage.getItem('userId')}`)
              .then((response) => {
                console.log('response', response.data.following[0].following);
                setFollowing(response.data.following[0].following);
                const userIds = [];
                for (let i = 0; i < response.data.following[0].following.length; i++) {
                  userIds.push(response.data.following[0].following[i]._id);
                }
                console.log('userIds', userIds);
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/posts`, {
                  params: { userIds: userIds }
                })
                  .then((response) => {
                    // console.log('response', response.data.posts);
                    setFollowingPostData(response.data.posts);
                    // setLoading(false);
                    console.log('response', response.data.posts);
                  })
                  .catch((error) => {
                    console.log('Error fetching posts:', error);
                    // setData([]);
                  }
                  );
              })
              .catch((error) => {
                console.log('Error fetching followings:', error);
                // router.push('/users/login');
              });
          } else {

            // router.push('/users/login');
          }
        })
        .catch((error) => {
          console.log(error);
          router.push('/users/login');
        });
    } else {
      router.push('/users/login');
    }
  }, [router]);

  if (isLoading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No data shown...</p>;

  return (
    <main className="d-flex justify-content-center align-items-center">
      <div className="home-feed">
        <div className="suggestions">
          <ul>
            <li className="user-item">
              <img
                src={data.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"}
                alt="User Avatar"
                className="user-avatar"
              />
              <a href="#" className="follow-link">
                {" "}
                Switch{" "}
              </a>
            </li>
            <hr />
            <li className="suggested-users">
              <p> Suggested for you </p>
              <p> See All </p>
            </li>
            <li className="user-item">
              <img
                src={faker.image.avatar()}
                alt="User Avatar"
                className="user-avatar"
              />
              <a href="#" className="follow-link">
                {" "}
                Follow{" "}
              </a>
            </li>
            <li className="user-item">
              <img
                src={faker.image.avatar()}
                alt="User Avatar"
                className="user-avatar"
              />
              <a href="#" className="follow-link">
                {" "}
                Follow{" "}
              </a>
            </li>
            <li className="user-item">
              <img
                src={faker.image.avatar()}
                alt="User Avatar"
                className="user-avatar"
              />
              <a href="#" className="follow-link">
                {" "}
                Follow{" "}
              </a>
            </li>
            <li className="user-item">
              <img
                src={faker.image.avatar()}
                alt="User Avatar"
                className="user-avatar"
              />
              <a href="#" className="follow-link">
                {" "}
                Follow{" "}
              </a>
            </li>
            <li className="user-item">
              <img
                src={faker.image.avatar()}
                alt="User Avatar"
                className="user-avatar"
              />
              <a href="#" className="follow-link">
                {" "}
                Follow{" "}
              </a>
            </li>
            {/* Add more suggestion items */}
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="stories">
          <div className="story-users">
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 1"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 2"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 3"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 4"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 5"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 6"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 7"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src={faker.image.avatar()}
                alt="User 8"
                className="story-avatar"
              />
            </div>
            {/* Add more story users */}
          </div>
        </div>

        <div className="row container d-flex justify-content-center">
          <div >
            {followingPostData.map((user, index) => {
              return (
                <div key={index}>
                  <div className="box box-widget">

                    <div className="box-header with-border ">
                      <div className="user-block ">
                        <br></br>

                        <img src={user.createdBy.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"} />
                        <span className="username">
                          <Link href={"/users/profile/" + user.createdBy._id} data-abc="true">{user.createdBy.username}</Link>

                        </span>

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
                      <img className="img-responsive pad" src={user.photo} alt="Photo" />
                      <p>{user.caption}</p>
                      <button type="button" className="btn btn-default btn-xs">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <button type="button" className="btn btn-default btn-xs">
                        <FontAwesomeIcon icon={faComment} />
                      </button>
                      <button type="button" className="btn btn-default btn-xs">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                      <span className="text-muted">{moment(new Date(user.createdAt)).fromNow()}</span>
                      <span className="pull-right text-muted">{user.likes.length} likes - {user.comments.length} comments</span>

                    </div>
                    <div className="box-footer box-comments">
                      <div className="box-comment">
                        <img className="img-circle img-sm" src={faker.image.avatar()} alt="User Image" />
                        <div className="comment-text">
                          <span className="username">
                            {user.username}<span className="text-muted pull-right">8:03 PM Today</span>
                          </span>
                          {faker.lorem.sentence()}
                        </div>
                      </div>
                    </div>
                    <div className="box-footer">
                      <form action="#" method="post">
                        <img className="img-responsive img-circle img-sm" src={data.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"} alt="Alt Text" />
                        <div className="img-push">
                          <input type="text" className="form-control input-sm" name='enterComment' placeholder="Press enter to post comment" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main >
  );
}

// style=“left: 1039.5px;”