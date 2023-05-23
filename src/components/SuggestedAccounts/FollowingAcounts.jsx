import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';
import FollowingItem from './FollowingItem';
const cx = classNames.bind(styles);
const FollowingAccounts = ({ label }) => {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <FollowingItem />
            <p className={cx('more-btn')}>See all</p>
        </div>
    );
};
FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default FollowingAccounts;
