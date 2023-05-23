import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './video.module.scss';
import Button from '~/components/Button/Button';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { likeCountOfVideo } from '~/utils/like-api';
import { getComment } from '~/utils/comment-api';
import { checkUserFollowed, followUser, unfollowUser } from '~/utils/follow-api';
import { likeVideo, unlikeVideo, userLiked } from '~/utils/like-api';

const cx = classNames.bind(styles);

const VideoPlayer = ({ video }) => {
    const { user } = useAuth();
    const [likeOfVideo, setLikeOfVideo] = useState(0);
    const [likeActive, setLikeActive] = useState(false);
    const [commentOfVideo, setCommentOfVideo] = useState([]);
    const [followActive, setFollowActive] = useState(false);
    const videoRef = useRef(null);

    const navigate = useNavigate();

    const handleClickLikeActive = async () => {
        if (likeActive) {
            setLikeActive(false);
            setLikeOfVideo((s) => s - 1);
            await unlikeVideo(video.id, user.id);
        } else {
            setLikeActive(true);
            setLikeOfVideo((s) => s + 1);
            await likeVideo(video.id, user.id);
        }
    };
    const handleClickFollowUser = async () => {
        if (followActive) {
            setFollowActive(false);
            await unfollowUser(user.id, video.user.id);
        } else {
            setFollowActive(true);
            await followUser(user.id, video.user.id);
        }
    };

    useEffect(() => {
        (async () => {
            if (user) {
                const liked = await userLiked(video?.user.id, user?.id);
                setLikeActive(liked);

                const followed = await checkUserFollowed(user.id, video.user.id);
                setFollowActive(followed);
            }
        })();
    }, [user, video]);

    useEffect(() => {
        (async () => {
            // count like
            const getLikeCountOfVideo = await likeCountOfVideo(video.id);
            setLikeOfVideo(getLikeCountOfVideo);
            // count comment
            const getCommentOfVideo = await getComment(video.id);
            setCommentOfVideo(getCommentOfVideo);
        })();
    }, [video.id]);
    useEffect(() => {
        let options = {
            rootMargin: '0px',
            threshold: [0.95],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (videoRef.current && document.visibilityState === 'visible') {
                        videoRef.current.play();
                    } else {
                        document.addEventListener('visibilitychange', function onVisibilityChange() {
                            if (document.visibilityState === 'visible' && videoRef.current) {
                                videoRef.current.play();
                                document.removeEventListener('visibilitychange', onVisibilityChange);
                            }
                        });
                    }
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            });
        };

        let observer;
        if (videoRef.current) {
            observer = new IntersectionObserver(handlePlay, options);
            observer.observe(videoRef.current);
            return () => {
                if (observer && videoRef.current) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    observer.unobserve(videoRef.current);
                }
            };
        }
    }, [videoRef]);

    const handleClickComment = () => {
        if (user) {
            navigate(`/comment?videoId=${video.id}`);
        }
    };
    const handleClickAvatar = () => {
        if (user) {
            navigate(`/profile?nickname=${video.user.nickname}`);
        }
    };
    return (
        <div className={cx('list_item-container')}>
            <div>
                <div
                    className={cx('avatar-user')}
                    style={{ width: '56px', height: '56px' }}
                    onClick={handleClickAvatar}
                >
                    <div className={cx('browse-user-avatar')}>
                        <div className={cx('user-avatar')} style={{ width: '56px', height: '56px' }}>
                            <span>{video.user.fullname[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('content-container')}>
                <div className={cx('content-info')}>
                    <div className={cx('author')}>
                        <Link to={`/profile?nickname=${video.user.nickname}`} className={cx('author-container')}>
                            <h3 className={cx('video-author_uniqued')}>{video.user.fullname}</h3>
                            <h4 className={cx('video-author_nickname')}>{video.user.nickname}</h4>
                        </Link>
                        {user && user.id !== video.user.id ? (
                            <Button outlineDanger className={cx('button')} onClick={() => handleClickFollowUser()}>
                                {!followActive ? 'Follow' : 'Following'}
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                <div className={cx('span-text')}>
                    <span>{video ? video.description : ''}</span>
                </div>
                <div className={cx('content-video')}>
                    <div className={cx('video')}>
                        <video
                            ref={videoRef}
                            src={video.url}
                            controls
                            loop
                            muted={false}
                            style={{ width: '100%', height: '584px' }}
                        ></video>
                    </div>
                    {user ? (
                        <div className={cx('action-item')}>
                            <button type="button" className={cx('like')}>
                                <span
                                    className={likeActive ? cx('span-icon_like-active') : cx('span-icon_like')}
                                    onClick={() => handleClickLikeActive()}
                                >
                                    <FontAwesomeIcon icon={faHeart} style={{ width: '24px', height: '24px' }} />
                                </span>
                                <strong className={cx('like-count')}>{likeOfVideo}</strong>
                            </button>

                            <button type="button" className={cx('comment')} onClick={handleClickComment}>
                                <span className={cx('span-icon_comment')}>
                                    <FontAwesomeIcon icon={faCommentDots} style={{ width: '24px', height: '24px' }} />
                                </span>
                                <strong className={cx('comment-count')}>{commentOfVideo.length}</strong>
                            </button>
                        </div>
                    ) : (
                        <div className={cx('action-item')}>
                            <button type="button" className={cx('like')}>
                                <span className={cx('span-icon_like')}>
                                    <FontAwesomeIcon icon={faHeart} style={{ width: '24px', height: '24px' }} />
                                </span>
                                <strong className={cx('like-count')}>{likeOfVideo}</strong>
                            </button>

                            <button type="button" className={cx('comment')}>
                                <span className={cx('span-icon_comment')}>
                                    <FontAwesomeIcon icon={faCommentDots} style={{ width: '24px', height: '24px' }} />
                                </span>
                                <strong className={cx('comment-count')}>{commentOfVideo.length}</strong>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
