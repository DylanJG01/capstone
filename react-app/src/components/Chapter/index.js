import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchChapter } from '../../store/story';
import { fetchSingleChapter } from '../../store/chapter';
import { fetchSingleStory } from '../../store/story';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import Reviews from '../Review'
import './Chapter.css'
import { fetchAllChapterReviews } from '../../store/review';
import PostReview from '../Review/PostReview';
import { useModal } from '../../context/Modal';
import PurchaseChapter from '../PurchaseChapter'

export default function Chapter(){
	const [user, story, chapter, reviews] = useSelector(state => [state.session.user, state.stories.singleStory, state.chapters.singleChapter, state.reviews.allReviews]);
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const [toChapter, setToChapter] = useState(1)
    const [myReviewId, setMyReviewId] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const { setModalContent, closeModal } = useModal()

    const reviewModal = () => {
            setModalContent(<PostReview
                userId={user.id}
                chapterId={chapter.id}
                closeModal={closeModal}/>
                )
    }

    useEffect(() => {
        const load = async () => {
            await dispatch(fetchSingleStory(params.storyId))
            await dispatch(fetchSingleChapter(params.chapterId))
            await dispatch(fetchAllChapterReviews(params.chapterId))
            setLoaded(true)
        }
        load();
    },[dispatch, user, params.chapterId, params.storyId, toChapter])

    useEffect(() => {
        if (user && reviews){

        setMyReviewId(Object.values(reviews).filter(review => review.userId === user.id)[0]?.id)
        }
    }, [reviews])

    if (!chapter || !story) return null
    const chapterArr = Object.values(story.allChapters)

    if (story){
        for (let i = 0; i < chapterArr.length; i++){
            if (chapterArr[i].id === chapter.id){
                chapter.index = chapterArr[i].index
                chapter.nextChapterId = chapterArr[i].nextChapterId
            }
        }
    }

    const options = []
    for (let i = 1; i <= Object.values(story.allChapters).length; i++){
        options.push(i)
    }

    const aFunc = () => {
        const chapter = chapterArr.filter(el =>{
                if(parseInt(el.index) === parseInt(toChapter)) {
                    return el
                }
            })[0]

        return history.push(`/stories/${story.id}/chapter/${chapter.id}`)
    }

    const toNext = () => {
        setToChapter(parseInt(toChapter) + 1)
        history.push(`/stories/${story.id}/chapter/${chapter.nextChapterId}`)

    }

    if(!loaded) return (<>Loading</>)

	return (

        <div className='chapter-page'>

            <div className='chapters-div'>
            <span>Select Chapter: </span>
            <select value={toChapter} onChange={e => {
                setToChapter(e.target.value)}}>
            {options.map(i => (
                <option value={i}>{i}</option>
            ))}
            </select>
            <button onClick={() => aFunc()}> Go!</button>
            </div>

            <div className='chapter-content-div'>

                <div className='chapter-title'>{chapter?.title}</div>
                {/*  I understand we're dangerously setting inner html, but we really aren't important enough for someone to put the effort in, I do hope.*/}
                {(!chapter.cost || story.user_id === user?.id || (user && user.purchased_chapters && user.purchased_chapters[chapter.id] === true) ) ?
                <>
                <div className='chapter-body' dangerouslySetInnerHTML={{__html: chapter.body}}/>
                </>
                :
                <PurchaseChapter user={user} chapterId={chapter?.id} cost={chapter?.cost} writerId={story.user_id}/>
                }

            </div>
            {chapter && chapter.nextChapterId && (<button onClick={() => toNext()}>Next</button>)}
            { user && !myReviewId && user?.id !== story?.user_id && (!chapter.cost || user.purchased_chapters && user.purchased_chapters[chapter.id]) && <button onClick={() => reviewModal("post")}>Review</button>}
            <Reviews reviews={reviews} myReviewId={myReviewId}/>
        </div>
	);
}
