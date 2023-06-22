import React from 'react';
import EditCost from './EditCost'
import { useModal } from '../../context/Modal';


export default function SetCostModal({chapter, user}){
    const { setModalContent, closeModal } = useModal()

    const editCost = () => {
        if (user.coins === null){
            setModalContent(
                <div className='coins-modal'>You must activate your wallet to set the cost of a chapter
                <button className='btn log-in active-close' onClick={closeModal}>Close </button></div>

            )
        } else {
            setModalContent(<EditCost
                closeModal={closeModal} chapter={chapter}/>
                )
        }
    }
	return (
        <button className='set-cost btn log-in' onClick={editCost}>
            Edit Cost
        </button>
	);
}
