import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllChapterReviews } from '../../store/review';
// import { useModal } from '../../context/Modal';
import './Review.css'
export default function Reviews({chapterId}){
	const reviews = useSelector(state => state.reviews.allReviews);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllChapterReviews(chapterId))
    },[dispatch, chapterId])

	return (
        <div className='review-container'>
        <ul>
        {reviews && Object.values(reviews).map(el => (<li className='review'><div>{el.stars}</div><p>{el.content}</p></li>))}
        </ul>
        </div>
	);
}
