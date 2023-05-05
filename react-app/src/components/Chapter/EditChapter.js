import React, { useEffect, useState, version} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapter } from '../../store/story';
import { fetchSingleChapter, fetchPutChapter } from '../../store/chapter';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import { titleValidator } from '../_helpers';
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
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()

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

    useEffect(() => {
        const ve = [] //Validation Errors
        setErrors([])
        if(titleValidator(title)) ve.push(titleValidator(title))
        if(!body) ve.push(("body-length"))
        if(ve.length) setErrors(ve)

      },[title, body])

    if (!story) return null





    const handleSubmit = async e => {
        e.preventDefault()
        if(errors.length){

        }
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
                    onChange={(e) => setTitle((e.target.value).replace(/^\s+/, ''))}
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
                placeholder={submitted && errors.includes('body-length') ? "Please add some content, even if it's just a letter." : "Chapter content here..."}
                className={submitted && errors.includes('body-length') ? "chapter-body" : "chapter-body red"}
                />
                </label>
                <button className='btn log-in save-submit' type="submit">Save</button>
            </form>
        </div>
    </>
	);
}
