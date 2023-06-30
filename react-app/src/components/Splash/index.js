import React from 'react';
import LoginFormModal from '../LoginFormModal';
import { useModal } from '../../context/Modal';
import SignupFormModal from '../SignupFormModal';
import './Splash.css'

export default function SplashPage (){
    const {closeModal, setModalContent} = useModal()

    const login = () => {
        return setModalContent(<LoginFormModal />)
    }
    const signup = () => {
        return setModalContent(<SignupFormModal />)
    }

    return (
    <div className='splash-wrapper'>
        <div className='splash-page'>
            <h2>Word Wraiths</h2>
            <h3>Welcome to Word Wraiths! Where you and many other like minded ghosts, ghouls, minions and monsters, and others read, write, share, sell and buy stories!</h3>
            <div className='splash-button-div'>
                <button onClick={signup}>Start Writing </button>
                <button onClick={signup}>Start Reading </button>
            </div>
        </div>
    </div>)
}
