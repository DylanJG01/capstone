import React from 'react';
import { useModal } from '../../context/Modal';
import PurchaseChapterModal from './PurchaseChapterModal';

export default function Purchase({user, chapterId, cost, writerId}){
    const { setModalContent, closeModal } = useModal()

    const purchaseModal = () => {
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
            <h3>Show your support for {user.username}, and continue reading this story</h3>
            <p className='unlock-story-text'>Unlock this story part for {cost} coins.</p>
            </div>
            <button onClick={() => purchaseModal() }> Click me </button>
        </div>
	);
}
