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
            <button onClick={() => purchaseModal() }> Click me </button>
        </div>
	);
}
