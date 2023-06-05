
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPutChapter } from '../../store/chapter';

export default function EditCost({closeModal, chapter}){
    const dispatch = useDispatch()
    const [cost, setCost] = useState(chapter?.cost || 0)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const e = []
        setErrors(e)
    }, [chapter])

    const editCost = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        if(e.length){
            return
        }
        const data = {...chapter}
        data.cost = cost
        dispatch(fetchPutChapter(data, data.id))
        closeModal()
      };

    return (
        <>
          <h1>Cost</h1>
          <form onSubmit={editCost}>
          <label>
              Cost {errors.includes("content") && <span className='err'> Review too long!</span>}
              <input
                type="text"
                value={cost}
                onChange={(e) => setCost((e.target.value).replace(/\D/g, ''))}
              />
            </label>
            <button type="submit">Edit</button>
          </form>
        </>
      );
}
