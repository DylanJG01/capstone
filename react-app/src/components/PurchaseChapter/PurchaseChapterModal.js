import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchBuyChapter } from '../../store/session';

export default function PurchaseChapterModal({closeModal, cost, user, chapterId, writerId}){
    const dispatch = useDispatch()

    const buyChapter = async (e) => {
        e.preventDefault();
        if(user.coins === null){
            return alert("You must have an activated wallet to purchase")
        }
        if(user.coins < cost){
          return alert("You don't have the required number of coins!")
        }
        dispatch(fetchBuyChapter({user_id: user.id, chapter_id: chapterId, cost, writer_id: writerId}))
        closeModal()
      };

    return (
        <div className='purchase-modal-div'>
          <h1>Purchase Modal</h1>
          <form className='purchase-form' onSubmit={buyChapter}>
            <div>You wanna purchase access to this chapter for {cost} coins? </div>
            <button className='btn' type="submit">Purchase!</button>
          </form>
        </div>
      );
}
