import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCake } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './AccountPreview.module.scss';
import { likeCountOfVideo } from '~/utils/like-api';
import { getFollowerOfUser } from '~/utils/follow-api';
const cx = classNames.bind(styles);
const AccountPreview = ({ user }) => {
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(0);
    const [followerAcount, setFollowerAcount] = useState(0);

    const handleClickProfile = () => {
        if (user) {
            navigate(`/profile?nickname=${user.user_nickname}`);
        }
    };

    useEffect(() => {
        (async () => {
            if (user) {
                const getLikeCountOfVideo = await likeCountOfVideo(user?.user_id);
                setLikeCount(getLikeCountOfVideo);

                const getFollowerUser = await getFollowerOfUser(user?.user_id);
                setFollowerAcount(getFollowerUser);
            }
        })();
    }, [user?.user_id]);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to={`/profile?nickname=${user.user_nickname}`} className={cx('browse-user-avatar')}>
                        <div className={cx('user-avatar')} style={{ width: '56px', height: '56px' }}>
                            <span>{user.user_fullname[0]}</span>
                        </div>
                    </Link>
                    {/* {user && user.id !== user.user_id ? (
                        <Button outlineDanger className={cx('button')} onClick={() => handleClickFollowUser()}>
                            {!followActive ? 'Follow' : 'Following'}
                        </Button>
                    ) : (
                        <></>
                    )} */}
                </div>
                <div className={cx('body')}>
                    <p className={cx('nickname')} onClick={handleClickProfile}>
                        <strong>{user ? user.user_nickname : 'nickname'}</strong>
                        {user.tick ? (
                            <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                        ) : (
                            <FontAwesomeIcon icon={faCake} className={cx('check1')} />
                        )}
                    </p>
                    <p className={cx('name')} onClick={handleClickProfile}>
                        {user ? user.user_fullname : 'fullname'}
                    </p>
                    <p className={cx('analytics')} onClick={handleClickProfile}>
                        <strong className={cx('value')}>{followerAcount.length}</strong>
                        <span className={cx('label')}>Followers</span>
                        <strong className={cx('value')}>{likeCount}</strong>
                        <span className={cx('label')}>Likes </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AccountPreview;
