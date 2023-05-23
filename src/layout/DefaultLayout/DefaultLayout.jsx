import { useLocation } from 'react-router';
import React from 'react';
import Header from '../components/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
export const DefaultLayout = ({ children }) => {
    let location = useLocation();
    const routes = location.pathname;
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div
                className={
                    routes === '/explore' || routes === '/following' || routes === '/profile'
                        ? cx('container1')
                        : cx('container')
                }
            >
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
