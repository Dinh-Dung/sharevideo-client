import React from 'react';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import config from '~/config';
import images from '~/asssets/images';
import Button from '~/components/Button/Button';
import Menu from '~/components/Popper/Menu/Menu';
import { UploadIcon } from '~/components/Icons';
import Search from '../Search';
import { useAuth } from '~/hooks/useAuth';
import AuthModal from '~/components/Auth/Auth';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const Header = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            onClick: () => navigate(`/profile?nickname=${user.nickname}`),
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            onClick: () => navigate('/coin'),
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            onClick: () => navigate('/settings'),
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
            type: 'logout',
            onClick: signOut,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src="logo2.png" alt="No images" />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {user ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <Link to={config.routes.upload}>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Link>
                            </Tippy>
                            {/* <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <span className={cx('bagdge')}>12</span>
                                    <InboxIcon />
                                </button>
                            </Tippy> */}
                        </>
                    ) : (
                        <>
                            <Link>
                                <AuthModal />
                            </Link>
                        </>
                    )}

                    {user ? (
                        <Menu items={userMenu}>
                            <div className={cx('user-avatar')} style={{ width: '40px', height: '40px' }}>
                                <span>{user.fullname[0]}</span>
                            </div>
                        </Menu>
                    ) : (
                        <Menu items={MENU_ITEMS}>
                            <Tippy>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Tippy>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
