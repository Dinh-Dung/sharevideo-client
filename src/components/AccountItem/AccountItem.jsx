import styles from './AccountItem.module.scss';
import Image from '../Image';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
    return (
        <Link to={`/profile?nickname=${data.nickname}`} className={cx('wrapper')}>
            <div className={cx('browse-user-avatar')}>
                <div className={cx('user-avatar')} style={{ width: '56px', height: '56px' }}>
                    <span>{data.fullname[0]}</span>
                </div>
            </div>
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data.fullname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                </p>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
