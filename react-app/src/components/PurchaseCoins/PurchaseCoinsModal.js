import React, { useState, } from 'react'
import { useDispatch } from 'react-redux';
import { fetchBuyCoins, fetchDeactivateWallet } from '../../store/session';

export default function PurchaseCoinsModal({closeModal, user, setModalContent}){
    const dispatch = useDispatch()
    const [coinAmount, setCoinAmount] = useState(0)

    const buyCoins = async (e) => {
        e.preventDefault();
        if (!coinAmount) return alert("You cannot purchase nothing.")
        await dispatch(fetchBuyCoins({ coins: coinAmount }))
        setModalContent(<div className='coins-modal'> Purchase successful </div>)
        setTimeout(closeModal, 1500)
    };
    const activateWallet = async (e) => {
      e.preventDefault();
      await dispatch(fetchBuyCoins({ coins: 300 }))
      setModalContent(<div className='coins-modal'> Wallet activation successful </div>)
      setTimeout(closeModal, 1500)
    };
    const emptyWallet = async (e) => {
      e.preventDefault();
      const payment = user.coins
      await dispatch(fetchBuyCoins({coins: -user.coins}))
      setModalContent(
      <div className='coins-modal empty'>
      Wallet successfully emptied and ${payment} has been deposited directly into your imagination
      <button className='coin-btn btn' onClick={closeModal}>Close</button>
      </div>
      )
      setTimeout(closeModal, 3000)

    };
    const deactivateWallet = async (e) => {
      e.preventDefault();
      const payout = user.coins
      let x = await dispatch(fetchDeactivateWallet())
      if (x) {
        setModalContent(
          <div className='coins-modal empty'>
          Wallet successfully deactivated and ${payout} have been deposited directly into your imagination.
          <button className='coin-btn btn' onClick={closeModal}>Close</button>
          </div>
          )
      }
      setTimeout(closeModal, 3000)
    };

    return (
        <div className='coins-modal'>
          {user.coins === null ?
            <div>
            <h1>Activate</h1>
            <form onSubmit={activateWallet} className='activate-form'>
              <p className='activate-p'> Activate wallet and get 300 free coins! </p>
            <button className="btn coin-btn active-btn" type="submit">Activate!</button>
            </form>
            </div>
            :
            <>
            <h1>Coin Shop</h1>
            <form onSubmit={buyCoins}>
              <div className='buy-coin-div'><span>9 coins</span><span className='coins-span' onClick={() => setCoinAmount(9)}>select</span></div>
              <div className='buy-coin-div'><span>66 coins</span><span className='coins-span' onClick={() => setCoinAmount(66)}>select</span></div>
              <div className='buy-coin-div'><span>120 coins</span><span className='coins-span' onClick={() => setCoinAmount(120)}>select</span></div>
              <div className='purchase-message'>Purchase {coinAmount} coins for ${(coinAmount/100).toFixed(2)} ? </div>
              <div className='submit-wrapper'>
              <button className='btn coin-btn' type="submit">Purchase?</button>
              </div>
            </form>
            <div className='end-wallet'>
            {user.coins > 0 && <form onSubmit={emptyWallet}>
              <button className='btn coin-btn' type="submit" >Empty wallet</button>
            </form>}
            <form onSubmit={deactivateWallet}>
              <button className='btn coin-btn' type="submit" >Deactivate Wallet</button>
            </form>
            </div>
          </>}
        </div>
      );
}
