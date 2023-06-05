import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPutChapter } from '../../store/chapter';
import EditCost from './EditCost'
import { useModal } from '../../context/Modal';


export default function SetCostModal({chapter}){
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal()

    const editCost = () => {
        setModalContent(<EditCost
            closeModal={closeModal} chapter={chapter}/>
            )
    }
	return (
        <button className='set-cost' onClick={editCost}>
            Edit Cost
        </button>
	);
}
