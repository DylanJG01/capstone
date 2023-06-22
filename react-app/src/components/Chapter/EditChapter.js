import React, { useEffect, useState, version} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapter } from '../../store/story';
import { fetchSingleChapter, fetchPutChapter } from '../../store/chapter';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import { titleValidator } from '../_helpers';
import { stripHtmlTags } from '../_helpers';

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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
        if(body && !stripHtmlTags(body)) ve.push(("body-length"))
        if(ve.length) setErrors(ve)

      },[title, body])

    if (!story) return null

    const handleSubmit = async e => {
        e.preventDefault()
        if (errors.length > 0){
            setSubmitted(true)
            console.log(errors)
            return
        }
        dispatch(fetchPutChapter({title, body, story_id: parseInt(params.storyId)}, parseInt(params.chapterId)))
        return alert("Saved! Prettier notification coming soon...")
    }
	return (
        <>
        <button className='btn log-in unique-classname' onClick={() => history.push(`/myworks/${params.storyId}`)}>Back</button>
        <div className='chapter-form-div'>
            <form onSubmit={handleSubmit} className='chapter-form'>
                {submitted && errors.includes('body-length') &&
                <div className='err chapter-body-length'>
                    The merest mote of language is all we demand, a single, measely character
                </div>}

                {submitted && errors.includes('title-long') &&
                <div className='err chapter-title-long'>
                    Title is too long!
                </div>}

                <label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle((e.target.value).replace(/^\s+/, ''))}
                    placeholder={submitted && errors.includes('title-short') ? "Title too short" : "Untitled..."}
                    className={submitted && errors.includes('title-short') ? "chapter-title red chapter-t-input" : "chapter-title chapter-t-input"}
                />
                </label>
                <label className='the-body'>
                <ReactQuill
                    theme="snow"
                    value={body}
                    onChange={setBody}
                    placeholder="Begin your story..."
                    style={{ '--placeholder-color': 'gray' }} // Apply custom placeholder color

                    />

                </label>
                <button className='btn log-in save-submit' type="submit">Save</button>
            </form>
        </div>
    </>
	);
}
