import React from 'react';
import LoginFormModal from '../LoginFormModal';
import { useModal } from '../../context/Modal';
import SignupFormModal from '../SignupFormModal';
import './Splash.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SplashPage (){
    const {closeModal, setModalContent} = useModal()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const write = () => {
        if (user) return history.push('myworks/new')

        return setModalContent(<SignupFormModal />)
    }
    const signup = () => {
        if (user) return history.push('/recommended')
        return setModalContent(<SignupFormModal />)
    }

    return (
    <div className='splash-wrapper'>
        <div className='splash-page'>
            <h2 className='splash-h2'>Word Wraiths</h2>
            <h3 className='splash-h3'>Welcome to Word Wraiths! Join a community of like-minded ghosts, ghouls, minions, monsters, and more as we delve into the captivating world of storytelling. Discover, create, share, and even sell your own stories on our platform.</h3>
            <div className='splash-button-div'>
                <div className='splash-img'>
                <img src="https://images.nightcafe.studio/jobs/9FLeEMxsF01V6eEQTvt7/9FLeEMxsF01V6eEQTvt7--4--szzdc_2x.jpg?tr=w-1600,c-at_max" alt='Skeleton at a typewriter'/>
                <img src="https://images.nightcafe.studio/jobs/d40zTntvwcfFB9lednJZ/d40zTntvwcfFB9lednJZ--3--t32rv.jpg?tr=w-1600,c-at_max" alt='spooky turtle reading a book'/>
                <img src="https://images.nightcafe.studio/jobs/tD8AjEsTHPmg8oVrhwdY/tD8AjEsTHPmg8oVrhwdY--3--vw2gy.jpg?tr=w-1600,c-at_max" alt='wraith with newspaper'/>
                </div>

                <div className='splash-login'>
                <button className='log-in splash-btn' onClick={write}>Start Writing </button>
                <button className='log-in splash-btn' onClick={signup}>Start Reading </button>
                </div>
            </div>
        </div>
    </div>)
}
