import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapter } from '../../store/story';
import { fetchSingleChapter, fetchPostChapter } from '../../store/chapter';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import { titleValidator } from '../_helpers';
import './Chapter.css'

export default function CreateChapter (){
	const [user, story, chapter] = useSelector(state => [state.session.user, state.stories.singleStory, state.chapters.singleChapter]);
    const dispatch = useDispatch()
    const params = useParams()
    const [errors, setErrors] = useState([])
    // const { setModalContent, setOnModalClose, closeModal } = useModal();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [content, setContent] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    // console.log(story)

    // useEffect(() => {
    //     // dispatch(fetchChapter( parseInt(params.chapterId), parseInt(params.
    //     // storyId),))
    //     dispatch(fetchSingleChapter(parseInt(params.chapterId)))
    // },[dispatch, user, params.chapterId, params.storyId])


    useEffect(() => {
        const ve = [] //Validation Errors
        setErrors([])
        if(titleValidator(title)) ve.push(titleValidator(title))
        if(!body) ve.push(("body-length"))
        if(ve.length) setErrors(ve)
        // console.log("!!")
      },[title, body])

    console.log(params)
    // console.log("STORIES", story)
    if (!story) return null

    // console.log((story))
    const handleSubmit = async e => {
        e.preventDefault()
        if (errors.length > 0){
            setSubmitted(true)
            return
        }
        await dispatch(fetchPostChapter({title, body, story_id: parseInt(params.storyId)}))
        return alert("Saved! Prettier notification coming soon...")
    }
	return (
        <>
        <button onClick={() => history.push(`/myworks/${params.storyId}`)}>Back</button>
        <div className='chapter-form-div'>
            <form onSubmit={handleSubmit} className='chapter-form'>
                <ul>
                {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
                </ul>
                <label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle((e.target.value).replace(/^\s+/, ''))}
                    placeholder={submitted && errors.includes('title-short') ? "Title too short" : "Untitled..."}
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
                className='chapter-body'
                />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
	);
}
