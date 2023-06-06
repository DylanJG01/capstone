import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeleteReview } from '../../store/review';
import { useModal } from '../../context/Modal';
import PurchaseChapterModal from './PurchaseChapterModal';


export default function Purchase({userId, chapterId, cost, writerId}){
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal()

    const purchaseModal = () => {
        setModalContent(<PurchaseChapterModal
                        closeModal={closeModal}
                        userId={userId}
                        chapterId={chapterId}
                        cost={cost}
                        writerId={writerId}
        />)
    }
	return (
        <div className='purchase-chapter'>
            <div></div>
            <button onClick={() => purchaseModal() }> Click me </button>
        </div>
	);
}
