import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapter } from '../../store/story';
import { fetchSingleChapter, fetchPutChapter } from '../../store/chapter';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import './Chapter.css'

export default function EditChapter (){
	const [user, story, chapter] = useSelector(state => [state.session.user, state.stories.singleStory, state.chapters.singleChapter]);
    const dispatch = useDispatch()
    const params = useParams()
    const [errors, setErrors] = useState([])
    // const { setModalContent, setOnModalClose, closeModal } = useModal();
    const [title, setTitle] = useState(chapter?.title || "")
    const [body, setBody] = useState(chapter?.body || "")
    const [content, setContent] = useState(chapter?.body || "")
    const history = useHistory()
    // console.log(story)

    useEffect(() => {
        // dispatch(fetchChapter( parseInt(params.chapterId), parseInt(params.
        // storyId),))
        dispatch(fetchSingleChapter(parseInt(params.chapterId)))
    },[dispatch, user, params.chapterId, params.storyId])


    useEffect (() => {
        if (!chapter) return null
        // setBody(chapter.body)
        setTitle(chapter.title)
        setBody(chapter.body)
    }, [dispatch, chapter])
    console.log(params)
    // console.log("STORIES", story)
    if (!story) return null

    // console.log((story))

    const handleSubmit = async e => {
        e.preventDefault()
        dispatch(fetchPutChapter({title, body, story_id: parseInt(params.storyId)}, parseInt(params.chapterId)))
        return alert("Saved! Prettier notification coming soon...")
    }
	return (
        <>
        <button onClick={() => history.push(`/myworks/${params.storyId}`)}>Back</button>
        <div className='chapter-form-div'>
            <form onSubmit={handleSubmit} className='chapter-form'>
                <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Untitled Story"
                    className='chapter-title'
                />
                </label>
                <label className='the-body'>
                {/* <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                /> */}
                <textarea
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='Your story here...'
                className='chapter-body'
                />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    </>
	);
}
