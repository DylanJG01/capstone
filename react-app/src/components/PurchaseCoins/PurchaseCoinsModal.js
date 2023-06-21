import React, { useState, } from 'react'
import { useDispatch } from 'react-redux';
import { fetchBuyCoins, fetchDeactivateWallet } from '../../store/session';

export default function PurchaseCoinsModal({closeModal, user, setModalContent}){
    const dispatch = useDispatch()
    const [coinAmount, setCoinAmount] = useState(0)
    const [content, setContent] = useState("default")

    const buyCoins = async (e) => {
        e.preventDefault();
        dispatch(fetchBuyCoins({ coins: coinAmount }))
        closeModal()
    };
    const activateWallet = async (e) => {
      e.preventDefault();
      dispatch(fetchBuyCoins({ coins: 300 }))
      closeModal()
    };
    const emptyWallet = async (e) => {
      e.preventDefault();
      await dispatch(fetchBuyCoins({coins: -user.coins}))
      closeModal()
    };
    const deactivateWallet = async (e) => {
      e.preventDefault();
      await dispatch(fetchDeactivateWallet())
    };

    return (
        <>
          {user.coins === null ?
            <>
            <h1>whaddup</h1>
            <form onSubmit={activateWallet}>
            Activate wallet and get 300 free coins!
            <button type="submit">Activate!</button>
            </form>
            </>
            :
            <>
            <h1>Coin Shop</h1>
            <form onSubmit={buyCoins}>
              <div>9 coins<span onClick={() => setCoinAmount(9)}>Buy</span></div>
              <div>66 coins<span onClick={() => setCoinAmount(66)}>Buy</span></div>
              <div>120 coins<span onClick={() => setCoinAmount(120)}>Buy</span></div>
              <div>Purchase {coinAmount} coins for ${(coinAmount/100).toFixed(2)} ? </div>
              <button type="submit">Purchase?</button>
            </form>
            {user.coins > 0 && <form onSubmit={emptyWallet}>
              <div>Cash out wallet?</div>
              <button type="submit">Empty wallet</button>
            </form>}
            <form onSubmit={deactivateWallet}>
              <div>Deactivate Wallet</div>
              <button type="submit">Deactivate Wallet</button>
            </form>
          </>}
        </>
      );
}
