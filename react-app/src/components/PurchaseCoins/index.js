import React from 'react';
import { useModal } from '../../context/Modal';
import PurchaseCoinsModal from './PurchaseCoinsModal';

export default function Purchase({}){
    const { setModalContent, closeModal } = useModal()

    const purchaseModal = () => {
        setModalContent(<PurchaseCoinsModal closeModal={closeModal} />)
    }

	return (
        <div className='purchase-coins'>
            <button onClick={() => purchaseModal() }> Buy coins</button>
        </div>
	);
}
