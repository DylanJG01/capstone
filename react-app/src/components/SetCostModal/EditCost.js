
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPutChapter } from '../../store/chapter';

export default function EditCost({closeModal, chapter}){
    const dispatch = useDispatch()
    const [cost, setCost] = useState(chapter?.cost || 0)
    const [errors, setErrors] = useState([])

    useEffect(() => {
      setErrors([])
        if (cost.toString().length > 5) {
          setErrors(['cost-high'])
        }
    }, [chapter, cost])

    const editCost = async (e) => {
        e.preventDefault();
        if(errors.length){
            return alert("Cost cannot exceed 9999")
        }
        const data = {...chapter}
        data.cost = cost
        dispatch(fetchPutChapter(data, data.id))
        closeModal()
      };

    return (
        <div className='cost-modal-div'>
          <h1>Set New Cost</h1>
          <form onSubmit={editCost} className='edit-cost-form'>
          <label>
              <input
                type="text"
                value={cost}
                onChange={(e) => setCost((e.target.value).replace(/\D/g, ''))}
              />
            </label>
            <button className='log-in btn edit-cost-btn' type="submit">Edit</button>
          </form>
        </div>
      );
}
