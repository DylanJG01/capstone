import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapter } from '../../store/story';
// import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom'

export default function EditChapter (){
	const [user, story] = useSelector(state => [state.session.user, state.stories.singleStory]);
    const dispatch = useDispatch()
    const params = useParams()
    const [errors, setErrors] = useState([])
    // const { setModalContent, setOnModalClose, closeModal } = useModal();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState(story?.singleChapter || "")
    console.log(story)

    useEffect(() => {
        dispatch(fetchChapter( parseInt(params.chapterId), parseInt(params.storyId),))
    },[dispatch, user, params.chapterId, params.storyId])

    useEffect (() => {

    })
    console.log("STORIES", story)
    if (!story) return null

    // console.log((story))

    const handleSubmit = async e => {
        console.log("whaddup thug?")
    }
	return (
        <form onSubmit={handleSubmit}>
        <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
        Title
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Story"
        />
        </label>
        <label>
        Content
        <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        </label>
        <button type="submit">Save</button>
    </form>
	);
}
