import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchBuyChapter, fetchBuyCoins } from '../../store/session';



export default function PurchaseChapterModal({setModalContent, closeModal, cost, user, chapterId, writerId}){
    const dispatch = useDispatch()

    const activateWallet = async (e) => {
      e.preventDefault();
      await dispatch(fetchBuyCoins({ coins: 300 }))
      setModalContent(<div className='coins-modal'>
         Wallet activation successful
         <button className='log-in btn' onClick={closeModal}>Close</button>
         </div>)
    };

    const buyChapter = async (e) => {
        e.preventDefault();
        if(user.coins === null){
        }
        if(user.coins < cost){
          return alert("You don't have the required number of coins!")
        }
        dispatch(fetchBuyChapter({user_id: user.id, chapter_id: chapterId, cost, writer_id: writerId}))
        closeModal()
      };

    return (
      <>
        {user.coins !== null ? <div className='purchase-modal-div'>
          <h1>Purchase Chapter</h1>
          <form className='purchase-form' onSubmit={buyChapter}>
            <div>Purchase access to this chapter for {cost} coins? </div>
            <button className='btn log-in' type="submit">Purchase!</button>
          </form>
        </div>:
        <div className='coins-modal'>
          <h2 className=''>You don't have an active wallet!</h2>
          <p>You must have an active wallet to purchase chapters.</p>
          <p>Activate new wallet and start with 300 free coins!</p>
          <button onClick={activateWallet}>Activate</button>
          <button onClick={closeModal}>Decline</button>
        </div>

      }
      </>
      );
}
