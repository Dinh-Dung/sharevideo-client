import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCake, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '../Popper';
import styles from './SuggestedAccounts.module.scss';
// import AccountPreview from './AccountPreview/AccountPreview';
import { getRandomUsersSuggest } from '~/utils/user-api';
import { useAuth } from '~/hooks/useAuth';
import AccountPreview from './AccountPreview/AccountPreview';
const cx = classNames.bind(styles);
const AccountItem = () => {
    const { user } = useAuth();
    const [randomUsers, setRandomUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const getRamdonUsers = await getRandomUsersSuggest();
            setRandomUsers(getRamdonUsers);
        })();
    }, []);

    const renderPreview = (user) => {
        return (
            <div tabIndex="-1">
                <PopperWrapper>
                    <AccountPreview user={user} key={`user_${user.id}`} />
                </PopperWrapper>
            </div>
        );
    };
    const handleClickProfile = (user) => {
        if (user) {
            navigate(`/profile?nickname=${user}`);
        }
    };
    return (
        <div>
            {randomUsers.map((user1, id) => (
                <Tippy
                    interactive
                    delay={[800, 0]}
                    offset={[-20, 0]}
                    placement="bottom"
                    render={() => renderPreview(user1)}
                    key={id}
                >
                    {/* {user ? ( */}
                    <div className={cx('account-item')} onClick={() => handleClickProfile(user1.user_nickname)}>
                        <Link className={cx('browse-user-avatar')}>
                            <div className={cx('user-avatar')} style={{ width: '56px', height: '56px' }}>
                                <span>{user1.user_fullname[0]}</span>
                            </div>
                        </Link>
                        <div className={cx('item-info')}>
                            <p className={cx('nickname')}>
                                <strong>{user1.user_nickname}</strong>
                                {user1.tick ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                                ) : (
                                    <FontAwesomeIcon icon={faCake} className={cx('check1')} />
                                )}
                            </p>
                            <p className={cx('name')}>{user1.user_fullname}</p>
                        </div>
                    </div>
                    {/* ) : ( */}
                    {/* <div className={cx('account-item')}>
                            <Link className={cx('browse-user-avatar')}>
                                <div className={cx('user-avatar')} style={{ width: '56px', height: '56px' }}>
                                    <span>{user1.user_fullname[0]}</span>
                                </div>
                            </Link>
                            <div className={cx('item-info')}>
                                <p className={cx('nickname')}>
                                    <strong>{user1.user_nickname}</strong>
                                    {user1.tick ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCake} className={cx('check1')} />
                                    )}
                                </p>
                                <p className={cx('name')}>{user1.user_fullname}</p>
                            </div>
                        </div> */}
                    {/* )} */}
                </Tippy>
            ))}
        </div>
    );
};

AccountItem.propTypes = {};
export default AccountItem;
