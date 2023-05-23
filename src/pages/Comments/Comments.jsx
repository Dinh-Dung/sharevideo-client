import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faClose,
    faHeart,
    faCircleXmark,
    faCircleCheck,
    faTrash,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Code, Telegram, FaceBook, WhatsApp, Twitter, Share } from '../../components/Icons';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import styles from './Comment.module.scss';
import { likeCountOfVideo } from '~/utils/like-api';
import { getVideoAndCommentById } from '~/utils/video-api';
import { Comment, deleteComment } from '~/utils/comment-api';
import { likeVideo, unlikeVideo, userLiked } from '~/utils/like-api';
import { deleteVideo, acceptVideo, acceptPrivateVideo } from '~/utils/video-api';

const cx = classNames.bind(styles);
function Comments() {
    const [video, setVideo] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [likeActive, setLikeActive] = useState(false);

    const { user } = useAuth();
    // eslint-disable-next-line no-unused-vars
    let [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const handleCloseClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        (async () => {
            const list = await getVideoAndCommentById(searchParams.get(`videoId`));
            setVideo(list);
            setComments(list.comment);
            //  like of video
            if (user && video) {
                const getLikeCountOfVideo = await likeCountOfVideo(video?.id);
                setLikeCount(getLikeCountOfVideo);

                const liked = await userLiked(video?.id, user.id);
                setLikeActive(liked);
            }
        })();
    }, [user, video?.id]);
    const handleClickLikeActive = async () => {
        if (likeActive) {
            setLikeActive(false);
            setLikeCount((s) => s - 1);
            await unlikeVideo(video.id, user.id);
        } else {
            setLikeActive(true);
            setLikeCount((s) => s + 1);
            await likeVideo(video.id, user.id);
        }
    };
    const handleSubmitComment = async (e) => {
        e.preventDefault();

        try {
            const dataCm = await Comment(user.id, video.id, commentText);

            const commentData = [
                ...comments,
                {
                    id: dataCm.id,
                    comment: dataCm.comment,
                    create_at: dataCm.create_at,
                    user: dataCm.user,
                },
            ];
            setComments(commentData);
            setCommentText('');
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeletecomment = async (id) => {
        try {
            await deleteComment(user.id, video.id, id);

            const commentArray = [...comments];
            const updatedList = commentArray.filter((comment) => comment.id !== id);

            setComments(updatedList);
        } catch (error) {
            console.log(error);
        }
    };
    const deletePendingVideo = async (id) => {
        try {
            await deleteVideo(id);
            const pendingVideoArray = [...video];
            const updateVideoList = pendingVideoArray.filter((video) => video.id !== id);
            navigate('/');
            setVideo(updateVideoList);
        } catch (error) {
            console.log(error);
        }
    };
    // accpet video dang o trang thai private thanh public
    const acceptVideoPrivate = async (id) => {
        try {
            await acceptVideo(id);
            const pendingVideoArray = [...video];
            const updateVideoList = pendingVideoArray.filter((video) => video.id === id);
            navigate('/');
            setVideo(updateVideoList);
        } catch (error) {}
    };
    // accept video dang o trang thai public thanhg private
    const acceptVideoPublics = async (id) => {
        try {
            await acceptPrivateVideo(id);
            const pendingVideoArray = [...video];
            const updateVideoList = pendingVideoArray.filter((video) => video.id === id);
            navigate('/');
            setVideo(updateVideoList);
        } catch (error) {}
    };
    if (!user || video === null) {
        return (
            <>
                <h1>😲 404 </h1>
                <h3>Page can't be found</h3>
            </>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <button className={cx('close-btn')} onClick={handleCloseClick}>
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
            </button>
            <div className={cx('browser-mode-container')}>
                <div className={cx('video-container')}>
                    <div className={cx('content-video')}>
                        <div className={cx('video')}>
                            <video src={video.url} controls loop style={{ width: '100%', height: '566px' }}></video>
                        </div>
                    </div>
                </div>
                <div className={cx('content-container')}>
                    <div className={cx('info-container')}>
                        <Link href="" className={cx('browse-user-avatar')}>
                            <div className={cx('user-avatar')} style={{ width: '40px', height: '40px' }}>
                                <span>{video.user.fullname[0]}</span>
                            </div>
                        </Link>
                        <Link href="" className={cx('browse-user-info')}>
                            <span className={cx('browse-user')}>{video.user.nickname}</span>
                            <br />
                            <span className={cx('browse-nickname')}>
                                {video.user.fullname}
                                <span style={{ margin: '0px 4px' }}>.</span>
                                <span>{video.user.created_at.slice(0, 10)}</span>
                            </span>
                        </Link>
                        {/* thu hien chap nhan video tu public sang thanh private */}
                        {user.id === video.user.id ? (
                            <>
                                {video.user_request_status === 'public' ? (
                                    <button className={cx('acceptvideo')} onClick={() => acceptVideoPublics(video.id)}>
                                        <FontAwesomeIcon icon={faLock} style={{ width: '18px', height: '18px' }} />
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <></>
                        )}

                        {/* thu hien chap nhan video tu private sang thanh public */}
                        {user.id === video.user.id ? (
                            <>
                                {video.user_request_status === 'private' ? (
                                    <button className={cx('acceptvideo')} onClick={() => acceptVideoPrivate(video.id)}>
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            style={{ width: '18px', height: '18px' }}
                                        />
                                    </button>
                                ) : (
                                    <></>
                                )}
                                <button className={cx('deletevideo')} onClick={() => deletePendingVideo(video.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ width: '18px', height: '18px' }} />
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className={cx('main-content')}>
                        <span style={{ fontFamily: 'sans-serif' }}>{video.description}</span>
                        <div className={cx('center-row')}>
                            <div className={cx('info-video')}>
                                <button type="button" className={cx('like')}>
                                    <span
                                        className={likeActive ? cx('span-icon_like-active') : cx('span-icon_like')}
                                        onClick={() => handleClickLikeActive()}
                                    >
                                        <FontAwesomeIcon icon={faHeart} style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <strong className={cx('like-count')}>{likeCount}</strong>
                                </button>
                                <button type="button" className={cx('comment')}>
                                    <span className={cx('span-icon_comment')}>
                                        <FontAwesomeIcon
                                            icon={faCommentDots}
                                            style={{ width: '18px', height: '18px' }}
                                        />
                                    </span>
                                    <strong className={cx('comment-count')}>{comments.length}</strong>
                                </button>
                            </div>
                            <div className={cx('share-group')}>
                                <Link href="">
                                    <Code />
                                </Link>
                                <Link href="">
                                    <Telegram />
                                </Link>
                                <Link href="">
                                    <FaceBook />
                                </Link>
                                <Link href="">
                                    <WhatsApp />
                                </Link>
                                <Link href="">
                                    <Twitter />
                                </Link>
                                <Link href="">
                                    <Share />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('comment-list')}>
                        <div className={cx('comment-list-content')}>
                            {comments.map((comment, id) => (
                                <div className={cx('info-user-container')} key={`user_${id}`}>
                                    <Link className={cx('browse-user-avatar')}>
                                        <div className={cx('user-avatar')} style={{ width: '40px', height: '40px' }}>
                                            <span>{comment.user.fullname[0]}</span>
                                        </div>
                                    </Link>
                                    <div className={cx('browse-user-info-comment')}>
                                        <span className={cx('browse-user-comment')}>{comment.user.fullname}</span>
                                        {user.nickname === video.user.nickname ||
                                        user.nickname === comment.user.nickname ? (
                                            <button
                                                className={cx('more-btn')}
                                                onClick={() => handleDeletecomment(comment.id)}
                                            >
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </button>
                                        ) : (
                                            <></>
                                        )}

                                        <br />
                                        <span className={cx('browse-nickname-comment')}>{comment.comment}</span>
                                        <span
                                            style={{ marginLeft: '10px', fontFamily: 'cursive' }}
                                            className={cx('time')}
                                        >
                                            {comment.create_at.slice(0, 10)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleSubmitComment}>
                        <div className={cx('bottom-comment-container')}>
                            <div className={cx('comment-container')}>
                                <div className={cx('input-write-content')}>
                                    <input
                                        type="text"
                                        placeholder="Add comment..."
                                        style={{ width: '432px' }}
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className={cx('submit')}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Comments;
