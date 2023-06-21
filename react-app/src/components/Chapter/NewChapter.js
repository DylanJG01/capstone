import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostChapter } from '../../store/chapter';
// import { useModal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom'
import { titleToSword, titleValidator } from '../_helpers';

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './Chapter.css'

export default function CreateChapter (){
	const story = useSelector(state => state.stories.singleStory);
    const dispatch = useDispatch()
    const params = useParams()
    const [errors, setErrors] = useState([])

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()

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
        if (errors.length > 0){
            setSubmitted(true)
            console.log(errors)
            return
        }
        await dispatch(fetchPostChapter({title, body, story_id: parseInt(params.storyId)}))

        return history.push(`/myworks/${story.id}-${titleToSword(story.title)}`)
    }
	return (
        <>
        <button className='btn log-in unique-classname' onClick={() => history.push(`/myworks/${params.storyId}`)}>Back</button>
        <div className='chapter-form-div'>
            <form onSubmit={handleSubmit} className='chapter-form'>
                <ul>
                {submitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle((e.target.value).replace(/^\s+/, ''))}
                    placeholder={submitted && errors.includes('title-short') ? "Title too short" : "Untitled..."}
                    className={submitted && errors.includes('title-short') ? "chapter-title red" : "chapter-title"}
                />
                </label>
                <label className='the-body'>
                <ReactQuill theme="snow" value={body} onChange={setBody} placeholder={submitted ? "Please enter content" : "fdsadfsa"}/>

                </label>
                <button className='btn log-in save-submit' type="submit">Submit</button>
            </form>
        </div>
    </>
	);
}
