import React, { useState, useEffect } from 'react'
import { fetchPostReview, fetchAllChapterReviews } from '../../store/review';
import { useDispatch } from 'react-redux';

export default function PostReview({userId, chapterId, closeModal, setMyReviewId}){
    const dispatch = useDispatch()
    const [stars, setStars] = useState(0)
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const e = []
        if (content.length > 1410) e.push("content")
        setErrors(e)
    }, [stars, content])

    const sendReview = async (e) => {
        e.preventDefault();
        if(e.length){
            return
        }
        dispatch(fetchPostReview({
            stars,
            content,
            chapter_id : chapterId,
            user_id : userId
        }))
        closeModal()
      };

    return (
        <>
          <h1>Review</h1>
          <form onSubmit={sendReview}>
            <label>
              Review {errors.includes("content") && <span className='err'> Review too long!</span>}
              <textarea
                type="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                cols={30}
              />
            </label>
            <label>
                Rating
                <div className="rate">
                    <input type="checkbox" id="star1" name="rate" value={stars} onChange={e => stars === 5 ? setStars(0) : setStars(5)} checked={(5===stars)}/>
                    <label htmlFor="star1" title="text"></label>
                    <input type="checkbox" id="star2" name="rate" value={stars} onChange={e => stars === 4 ? setStars(0) : setStars(4)} checked={(4===stars)}/>
                    <label htmlFor="star2" title="text"></label>
                    <input type="checkbox" id="star3" name="rate" value={stars} onChange={e => stars === 3 ? setStars(0) : setStars(3)} checked={(3===stars)} />
                    <label htmlFor="star3" title="text"></label>
                    <input type="checkbox" id="star4" name="rate" value={stars} onChange={e => stars === 2 ? setStars(0) : setStars(2)} checked={(2===stars)}/>
                    <label htmlFor="star4" title="text"></label>
                    <input type="checkbox" id="star5" name="rate" value={stars} onChange={e => stars === 1 ? setStars(0) : setStars(1)} checked={(1===stars)} />
                    <label htmlFor="star5" title="text"></label>
                </div>
            </label>
            <button type="submit">Review</button>
          </form>
        </>
      );
}
