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
        <div className='purchase-coins' onClick={() => purchaseModal()}>
             <button className='coins-button'> <img className='coin-img' src="https://thisisthebucketthatdylanmade.s3.us-west-1.amazonaws.com/coin.png" alt='coins icon'/> </button>
             { user.coins === null ? <div className='user-coins'> - </div> : <div className='user-coins'>{user.coins}</div>}
        </div>
	);
}
