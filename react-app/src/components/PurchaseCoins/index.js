import React from 'react';
import { useModal } from '../../context/Modal';
import PurchaseCoinsModal from './PurchaseCoinsModal';
import './PurchaseCoins.css'

export default function Purchase({user}){
    const { setModalContent, closeModal } = useModal()

    const purchaseModal = () => {
        setModalContent(<PurchaseCoinsModal setModalContent={setModalContent} closeModal={closeModal} user={user} />)
    }

	return (
        <div className='purchase-coins'>
            { user.coins === null ? null : <div>{user.coins}</div>}
            <button className='coins-button' onClick={() => purchaseModal() }> C </button>
        </div>
	);
}
