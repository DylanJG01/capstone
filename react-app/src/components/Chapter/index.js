import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchChapter } from '../../store/story';
import { fetchSingleChapter } from '../../store/chapter';
import { fetchSingleStory } from '../../store/story';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import './Chapter.css'

export default function Chapter(){
	const [user, story, chapter] = useSelector(state => [state.session.user, state.stories.singleStory, state.chapters.singleChapter]);
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const [toChapter, setToChapter] = useState( chapter?.index || 1)
    // const { setModalContent, setOnModalClose, closeModal } = useModal();

    console.log(params)

    useEffect(() => {
        dispatch(fetchSingleChapter( params.chapterId))
        dispatch(fetchSingleStory(params.storyId))
    },[dispatch, user, params.chapterId, params.storyId])
    // console.log("STORIES", story)

    if (!chapter || !story) return null



    if (story){
        Object.values(story.allChapters).forEach(el => {
            if (el.id === chapter.id){
                chapter.index = el.index
            }
        })
    }

    const options = []
    for (let i = 1; i <= Object.values(story.allChapters).length; i++){
        options.push(i)
    }

    const aFunc = () => {
        // const theChapter = Object.values(story.allChapters).filter(el => el.index === toChapter)
        // console.log(theChapter)
        // if (theChapter) return history.push(`/stories/${story.id}/chapter/${theChapter[0].id}`)

        const x = Object.values(story.allChapters)
        const y = x.filter(el =>{
            console.log(typeof el.index)
            console.log(typeof toChapter)
            return parseInt(el.index) === parseInt(toChapter)
        })
        if (y) return history.push(`/stories/${story.id}/chapter/${y[0].id}`)
    }

	return (
        <div className='chapter-page'>
            <select value={toChapter} onChange={e => setToChapter(e.target.value)}>
            {options.map(i => (
                <option value={i}>{i}</option>
            ))}
            </select>
            <button onClick={() => aFunc()}>Let'sAGo</button>

            <div className='chapter-content-div'>
                <div className='chapter-title'>{chapter.title}</div>
                <div className='chapter-body'>{chapter.body}</div>
            </div>
            <div>What?</div>
        </div>
	);
}
