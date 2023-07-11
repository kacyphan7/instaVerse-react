'use client';
// import Image from 'next/image';
// import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import './post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-6">
              <div className="box box-widget">
                <div className="box-header with-border">
                  <div className="user-block">
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
              <div className="box box-widget">
                <div className="box-header with-border">
                  <div className="user-block">
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
      </div>
    </main>
  );
}

