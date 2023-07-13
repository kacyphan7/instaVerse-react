'use client';
// import Image from 'next/image';
// import 'bootstrap/dist/css/bootstrap.css';
//import './globals.css';
import './css/post.css';
import './css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import setAuthToken from './utils/setAuthToken';

export default function Homepage() {

  // const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
  // let currentTime = Date.now();

  // // make a condition that compares exp and current time
  // if (currentTime >= expirationTime) {
  //   handleLogout();
  //   alert('Session has ended. Please login to continue.');
  //   router.push('/users/login');
  // }
  setAuthToken(localStorage.getItem('jwtToken'));
  return (
    <main className="d-flex justify-content-center align-items-center">
      <div className="home-feed">
        <div className="suggestions">
          <ul>
            <li className="user-item">
              <img
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
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
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
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
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
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
                src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
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
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
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
                src="https://images.unsplash.com/photo-1492446845049-9c50cc313f00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
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
                src="https://images.unsplash.com/photo-1674574124792-3be232f1957f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="User 1"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                alt="User 2"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                alt="User 3"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                alt="User 4"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="User 5"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="User 6"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="User 7"
                className="story-avatar"
              />
            </div>
            <div className="story-user">
              <img
                src="https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="User 8"
                className="story-avatar"
              />
            </div>
            {/* Add more story users */}
          </div>
        </div>

        <div className="row container d-flex justify-content-center">
          <div className="col-md-6">
            <div className="box box-widget">
              <div className="box-header with-border ">
                <div className="user-block ">
                  <br></br>
                  <img className="img-circle" src="https://img.icons8.com/color/36/000000/guest-male.png" alt="User Image" />
                  <span className="username">
                    <a href="#" data-abc="true">Henery German</a>
                  </span>
                  <span className="description">Public - 7:30 PM Today</span>
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
                <img className="img-responsive pad" src="https://i.imgur.com/EAQkLS1.jpg" alt="Photo" />
                <p>Look at the beach photo I clicked</p>
                <button type="button" className="btn btn-default btn-xs">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button type="button" className="btn btn-default btn-xs">
                  <FontAwesomeIcon icon={faComment} />
                </button>
                <button type="button" className="btn btn-default btn-xs">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                <span className="pull-right text-muted">127 likes - 3 comments</span>
              </div>
              <div className="box-footer box-comments">
                <div className="box-comment">
                  <img className="img-circle img-sm" src="https://img.icons8.com/office/36/000000/person-female.png" alt="User Image" />
                  <div className="comment-text">
                    <span className="username">
                      Tina Domiaz <span className="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    For what reason would it be advisable for me to think about business content?
                  </div>
                </div>
                <div className="box-comment">
                  <img className="img-circle img-sm" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="User Image" />
                  <div className="comment-text">
                    <span className="username">
                      Smith helm <span className="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    That might be a little bit risky to have a crew member like them.
                  </div>
                </div>
              </div>
              <div className="box-footer">
                <form action="#" method="post">
                  <img className="img-responsive img-circle img-sm" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="Alt Text" />
                  <div className="img-push">
                    <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// style=“left: 1039.5px;”