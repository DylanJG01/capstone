import React from 'react';
import { useModal } from '../../context/Modal';
import PurchaseChapterModal from './PurchaseChapterModal';

export default function Purchase({user, chapterId, cost, writerId, author}){
    const { setModalContent, closeModal } = useModal()

    const purchaseModal = () => {
        console.log(user)
        if (!user) {
           return setModalContent(<div className='coins-modal txt-ctr'>You must log in to purchase things!<button className='btn log-in'onClick={closeModal}>Close</button></div>)
        }
        setModalContent(<PurchaseChapterModal
                        closeModal={closeModal}
                        user={user}
                        chapterId={chapterId}
                        cost={cost}
                        writerId={writerId}
        />)
    }
	return (
        <div className='purchase-chapter'>
            <i className="fa-solid fa-lock"></i>
            <div>
            <h3>Show your support for {author}, and continue reading this story</h3>
            <p className='unlock-story-text'>Unlock this chapter for {cost} coins.</p>
            </div>
            <button className='btn log-in click-me' onClick={() => purchaseModal() }> Click me </button>
        </div>
	);
}
