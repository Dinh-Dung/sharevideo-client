/* eslint-disable no-self-assign */
import React from 'react';
import Modal from 'react-modal';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import Button from '~/components/Button/Button';
import { signUp } from '~/utils/auth-api';

const cx = classNames.bind(styles);
const customStyles = {
    content: {
        top: '54%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '483px',
    },
};
Modal.setAppElement('#root');
const SignUp = ({ changeModalMode, modalIsOpen, closeModal }) => {
    const [newUser, setNewUser] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevS) => ({
            ...prevS,
            [name]: value,
        }));
    };
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        setMessage('');
        e.preventDefault();

        if (newUser.password !== newUser.confirmPassword) {
            setLoading(false);
            setMessage('Password does not match! Please check and try again !');
            return;
        }
        const { confirmPassword, ...body } = newUser;
        const data = await signUp(body);

        if (!data) {
            setLoading(false);
            setMessage('Bad user data, please try again with another information !');
            return;
        }

        changeModalMode('login');
        setLoading(false);
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
                            Sign Up
                        </h2>
                    </div>

                    <div className={cx('login-container')}>
                        <span>Email or username</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('fullname')}>
                            <input
                                type="text"
                                id="fullname"
                                placeholder="FullName"
                                name="fullname"
                                value={newUser.fullname}
                                className={cx('input-fullname')}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className={cx('username')}>
                            <input
                                type="text"
                                id="username"
                                placeholder="Email or username"
                                name="username"
                                value={newUser.username}
                                className={cx('input-username')}
                                onChange={handleFormChange}
                                required
                            />
                        </div>

                        <div className={cx('password')}>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={newUser.password}
                                className={cx('input-password')}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className={cx('confirm-password')}>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                className={cx('input-confirmPassword')}
                                value={newUser.confirmPassword}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className={cx('message-box')}>{message}</div>
                        <div className={cx('button-submit')}>
                            <Button primary onClick={handleSubmit}>
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={cx('footer-login')}>
                    <div className={cx('bottom-text')}>Already have an account?</div>
                    <span onClick={changeModalMode}>Sign In</span>
                </div>
            </Modal>
        </div>
    );
};

export default SignUp;
