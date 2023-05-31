import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchChapter } from '../../store/story';
import { fetchSingleChapter } from '../../store/chapter';
import { fetchSingleStory } from '../../store/story';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import Reviews from '../Review'

import './Chapter.css'

export default function Chapter(){
	const [user, story, chapter] = useSelector(state => [state.session.user, state.stories.singleStory, state.chapters.singleChapter]);
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const [toChapter, setToChapter] = useState(1)
    const [loaded, setLoaded] = useState(false)
    // const { setModalContent, setOnModalClose, closeModal } = useModal();

    useEffect(() => {
        const load = async () => {
            await dispatch(fetchSingleStory(params.storyId))
            await dispatch(fetchSingleChapter(params.chapterId))
            setLoaded(true)
        }
        load();
    },[dispatch, user, params.chapterId, params.storyId, toChapter])


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
            <div>
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
                <div className='chapter-title'>{chapter.title}</div>

                {/*  I understand we're dangerously setting inner html, but we really aren't important enough for someone to put the effort in, I do hope.*/}
                <div className='chapter-body' dangerouslySetInnerHTML={{__html: chapter.body}}/>
            </div>
            {chapter && chapter.nextChapterId && (<button onClick={() => toNext()}>Next</button>)}
            <Reviews chapterId={chapter.id}/>
        </div>
	);
}
