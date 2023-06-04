import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPutChapter } from '../../store/chapter';
import { useModal } from '../../context/Modal';

export default function SetCostModal({chapter}){
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal()

    const editReview = () => {
        setModalContent(<EditReview
            review={reviews[myReviewId]}
            closeModal={closeModal}/>
            )
    }
	return (
        <div className='review-container'>

        </div>
	);
}
