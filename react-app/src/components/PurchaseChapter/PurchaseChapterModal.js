import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchBuyChapter } from '../../store/session';

export default function PurchaseChapterModal({closeModal, cost, userId, chapterId, writerId}){
    const dispatch = useDispatch()

    const buyChapter = async (e) => {
        e.preventDefault();
        if(e.length){
            return
        }
        dispatch(fetchBuyChapter({user_id: userId, chapter_id: chapterId, cost, writer_id: writerId}))
        closeModal()
      };

    return (
        <>
          <h1>Purchase Modal</h1>
          <form onSubmit={buyChapter}>
            <div>You wanna purchase access to this chapter for {cost} coins? </div>
            <button type="submit">Purchase?</button>
          </form>
        </>
      );
}
