import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuth } from '~/hooks/useAuth';
import AccountItem from '../SuggestedAccounts/AccountItem';
import Button from '../Button/Button';

const AuthModal = () => {
    const [modalState, setModalState] = useState('signin');
    const [modalIsOpen, setIsOpen] = useState(false);
    const { accessToken } = useAuth();

    const changeModalMode = () => {
        setModalState((prevS) => (prevS === 'signin' ? 'signup' : 'signin'));
    };

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            {accessToken ? (
                <AccountItem />
            ) : (
                <Button primary onClick={openModal}>
                    Login
                </Button>
            )}
            {modalState === 'signin' ? (
                <SignIn closeModal={closeModal} modalIsOpen={modalIsOpen} changeModalMode={changeModalMode} />
            ) : (
                <SignUp closeModal={closeModal} modalIsOpen={modalIsOpen} changeModalMode={changeModalMode} />
            )}
        </>
    );
};

export default AuthModal;
