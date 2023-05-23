import React from 'react';
import classNames from 'classnames/bind';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    // LiveIcon,
    // LiveActiveIcon,
    ExploreIcon,
    ExploreIconActive,
} from '~/components/Icons';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import FollowingAccounts from '~/components/SuggestedAccounts/FollowingAcounts';
import Footer from '~/components/Footer/Footer';
import { useAuth } from '~/hooks/useAuth';

const cx = classNames.bind(styles);
export const Sidebar = () => {
    const { user } = useAuth();
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                {user ? (
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                ) : null}
                <MenuItem
                    title="Explore"
                    icon={<ExploreIcon />}
                    activeIcon={<ExploreIconActive />}
                    to={config.routes.explore}
                />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" />
            {user ? <FollowingAccounts label="Following accounts" /> : null}
            <Footer />
        </aside>
    );
};
