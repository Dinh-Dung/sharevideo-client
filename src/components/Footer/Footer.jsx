import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const footerList1 = ['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory'];
const footerList2 = ['Wibeo for Good', 'Advertise', 'Developers', 'Transparency', 'Wibeo Rewards'];
const footerList3 = ['Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines'];

const cx = classNames.bind(styles);
const List = ({ item, mt }) => (
    <div className={cx('list')}>
        {item.map((item) => (
            <p key={item} className={cx('list-item')}>
                {item}
            </p>
        ))}
    </div>
);

const Footer = () => {
    return (
        <div className={cx('display-item')}>
            <List item={footerList1} mt={false} />
            <List item={footerList2} />
            <List item={footerList3} />
            <p className={cx('copyright')}>© 2023 Wibeo</p>
        </div>
    );
};

export default Footer;
