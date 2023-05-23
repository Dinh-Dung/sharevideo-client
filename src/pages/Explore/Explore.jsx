import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Explore.module.scss';
import { getVideoToday } from '~/utils/video-api';
import { useAuth } from '~/hooks/useAuth';
const cx = classNames.bind(styles);
const Explore = () => {
    const [videoToday, setVideoToday] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const list = await getVideoToday();
            setVideoToday(list);
        })();
    }, []);
    const handleClickComment = (id) => {
        if (user) {
            navigate(`/comment?videoId=${id}`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-list')}>
                <h2>Videos today</h2>
            </div>
            <div className={cx('explore-item_container')}>
                <div className={cx('explore-item-list')}>
                    {videoToday.map((video, id) => (
                        <div className={cx('content-video')} key={id} onClick={() => handleClickComment(video.id)}>
                            <div className={cx('video')}>
                                <video src={video.url} controls style={{ width: '100%', height: '456px' }}></video>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;
