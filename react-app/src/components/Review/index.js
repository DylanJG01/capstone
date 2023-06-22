import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeleteReview } from '../../store/review';
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
            <h3 className='h3-reviews'>Reviews</h3>
            <ul>
                {reviews && Object.values(reviews).map((el, i) => (
                <li className='review' key={"review" + i}>
                    <div className='review-user'> {el.user.username}</div>
                    <div className='rating'> Rating: {el.stars} <i class="fa-solid fa-star" /></div>
                    <div className='review-p'> {el.content} </div>
                    { myReviewId === el.id &&
                    <div>
                    <button className='btn log-in' onClick={() => deleteReview(el.id)}> delete </button>
                    <button className='btn log-in' onClick={() => editReview()}> edit </button>
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
