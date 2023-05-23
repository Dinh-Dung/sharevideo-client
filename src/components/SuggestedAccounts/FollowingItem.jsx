import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheckCircle, faCake } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '../Popper';
import styles from './SuggestedAccounts.module.scss';
import FollowingPreview from './AccountPreview/FollowingPreview';
import { getUserFollowers } from '~/utils/user-api';
import { useAuth } from '~/hooks/useAuth';
const cx = classNames.bind(styles);
const FollowingItem = () => {
    const { user } = useAuth();
    const [followingAcounts, setFollowingAcounts] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            if (user) {
                const getFollowingUsers = await getUserFollowers(user.id);
                setFollowingAcounts(getFollowingUsers);
            }
        })();
    }, [user]);
    const renderPreview = (user) => {
        return (
            <div tabIndex="-1">
                <PopperWrapper>
                    <FollowingPreview user={user} key={`user_${user.id}`} />
                </PopperWrapper>
            </div>
        );
    };
    const handleClickProfile = (user) => {
        if (user) {
            navigate(`/profile?nickname=${user.tiktoker.nickname}`);
        }
    };
    return (
        <div>
            {followingAcounts.map((user, id) => (
                <Tippy
                    interactive
                    delay={[800, 0]}
                    offset={[-20, 0]}
                    placement="bottom"
                    render={() => renderPreview(user)}
                    key={id}
                >
                    <div className={cx('account-item')} onClick={() => handleClickProfile(user)}>
                        <Link className={cx('browse-user-avatar')}>
                            <div className={cx('user-avatar')} style={{ width: '56px', height: '56px' }}>
                                <span>{user.tiktoker.fullname[0]}</span>
                            </div>
                        </Link>
                        <div className={cx('item-info')}>
                            <p className={cx('nickname')}>
                                <strong>{user.tiktoker.nickname}</strong>
                                {user.tiktoker.tick ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                                ) : (
                                    <FontAwesomeIcon icon={faCake} className={cx('check1')} />
                                )}
                            </p>
                            <p className={cx('name')}>{user.tiktoker.fullname}</p>
                        </div>
                    </div>
                </Tippy>
            ))}
        </div>
    );
};

FollowingItem.propTypes = {};
export default FollowingItem;
