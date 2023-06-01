import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview, fetchDeleteReview } from '../../store/review';
import EditReview from './EditReview';
import { useModal } from '../../context/Modal';

// import { useModal } from '../../context/Modal';
import './Review.css'

export default function Reviews({reviews, myReviewId}){
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal()

    const deleteReview = (reviewId) => {
        dispatch(fetchDeleteReview(reviewId))
    }
    const editReview = () => {
        setModalContent(<EditReview
            review={reviews[myReviewId]}
            closeModal={closeModal}/>
            )
    }
	return (
        <div className='review-container'>
            <ul>
                {reviews && Object.values(reviews).map(el => (
                <li className='review'>
                    <div> {el.stars} </div>
                    <p> {el.content} </p>
                    { myReviewId === el.id &&
                    <div>
                    <button onClick={() => deleteReview(el.id)}> delete </button>
                    <button onClick={() => editReview()}> edit </button>
                    </div>
                    }
                </li>
                ))}
            </ul>
        </div>
	);
}

// export default function Reviews({chapterId}){
// 	const reviews = useSelector(state => state.reviews.allReviews.reviews);
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(fetchAllChapterReviews(chapterId))
//     },[dispatch, chapterId])

// 	return (
//         <div className='review-container'>
//         <ul>
//             {reviews && Object.values(reviews).map(el => (
//             <li className='review'>
//                 <div> {el.stars} </div>
//                 <p> {el.content} </p>
//                 <button> delete </button>
//                 <button> edit </button>
//             </li>
//             ))}
//         </ul>
//         </div>
// 	);
// }
