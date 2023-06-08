import React, { useState, } from 'react'
import { useDispatch } from 'react-redux';
import { fetchBuyCoins } from '../../store/session';

export default function PurchaseCoinsModal({closeModal}){
    const dispatch = useDispatch()
    const [coinAmount, setCoinAmount] = useState(0)

    const buyCoins = async (e) => {
        e.preventDefault();
        dispatch(fetchBuyCoins({ coins: coinAmount }))
        closeModal()
      };

    return (
        <>
          <h1>Purchase Modal</h1>

          <form onSubmit={buyCoins}>
            <div>100 coins<span onClick={() => setCoinAmount(100)}>Buy</span></div>
            <div>300 coins<span onClick={() => setCoinAmount(300)}>Buy</span></div>
            <div>500 coins<span onClick={() => setCoinAmount(500)}>Buy</span></div>
            <div>Purchase {coinAmount} coins for y dollars? </div>
            <button type="submit">Purchase?</button>
          </form>
        </>
      );
}
