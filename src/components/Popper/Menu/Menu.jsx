import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
const cx = classNames.bind(styles);

const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    useEffect(() => {
        setHistory([{data: items}])
    }, [items])

    const renderItems = () => {
        return current?.data.map((item, index) => {
            const isParent = !item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                            item.onClick();
                        } else {
                            onChange(item);
                        }
                    }}
                    // onClick={() => item.onClick()}
                />
            );
        });
    };

    const handleOnback = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current?.title} onBack={handleOnback} />}
                <div className={cx('menu-body')}> {renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 500]}
            offset={[12, 8]}
            render={renderResult}
            onHide={handleResetMenu}
            hideOnClick={hideOnClick}
        >
            {children}
        </Tippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    item: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Menu;
