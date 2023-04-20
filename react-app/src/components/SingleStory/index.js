import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleStory } from '../../store/story';
// import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom'

export default function SingleStory(){
	const [user, story] = useSelector(state => [state.session.user, state.stories.singleStory]);
    const dispatch = useDispatch()
    const params = useParams()
    // const { setModalContent, setOnModalClose, closeModal } = useModal();

    console.log(params)

    useEffect(() => {
        dispatch(fetchSingleStory( params.storyId ))
    },[dispatch, user])
    console.log("STORIES", story)
    if (!story) return null

    console.log((story))

	return (
        <>
        {story.title}
        <img src={story.cover} alt={story.title + " cover image"}/>
        </>
	);
}
