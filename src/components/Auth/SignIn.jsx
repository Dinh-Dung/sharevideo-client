/* eslint-disable no-self-assign */
import React, { useEffect } from 'react';
import Modal from 'react-modal';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import Button from '~/components/Button/Button';
import { useAuth } from '~/hooks/useAuth';

const cx = classNames.bind(styles);
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '483px',
    },
};

Modal.setAppElement('#root');
const SignIn = ({ changeModalMode, modalIsOpen, closeModal }) => {
    const { signIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [message, setMessage] = useState('');

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }
    const handleUsername = (e) => {
        const data = e.target.value;
        setUsername(data);
    };

    const handlePassword = (e) => {
        const data = e.target.value;
        setPassword(data);
    };

    const handleSubmit = async (e) => {
        setIsLoggingIn(true);
        e.preventDefault();

        const data = await signIn(username, password);
        setMessage('Username or password incorrect !');

        if (!data) {
            setMessage('Username or password incorrect !');
            setIsLoggingIn(false);
            return;
        }
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} className={cx('close-btn')}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('container')}>
                    <div className={cx('login-header')}>
                        <h2
                            ref={(_subtitle) => (_subtitle = _subtitle)}
                            style={{ textAlign: 'center' }}
                            className={cx('content')}
                        >
                            Log in
                        </h2>
                    </div>

                    <div className={cx('login-container')}>
                        <span>Email or username</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('username')}>
                            <input
                                type="text"
                                placeholder="Email or username"
                                name="username"
                                className={cx('input-username')}
                                onChange={handleUsername}
                            />
                        </div>

                        <div className={cx('password')}>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className={cx('input-password')}
                                onChange={handlePassword}
                            />
                        </div>
                        <div className={cx('message-box')}>{message}</div>
                        <div className={cx('remember-forget-box')}>
                            <div className={cx('remember-box')}>
                                <input type="checkbox" />
                            </div>
                            <span className={cx('gold-content')}>Forget your password?</span>
                        </div>
                        <div className={cx('button-submit')}>
                            <Button primary onClick={handleSubmit}>
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={cx('footer-login')}>
                    <div className={cx('bottom-text')}>Don’t have an account?</div>
                    <span onClick={changeModalMode}>Sign Up</span>
                </div>
            </Modal>
        </div>
    );
};

export default SignIn;
