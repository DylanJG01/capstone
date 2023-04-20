import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapter, fetchSingleStory } from '../../store/story';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom'

export default function Chapter(){
	const [user, story] = useSelector(state => [state.session.user, state.stories.singleStory]);
    const dispatch = useDispatch()
    const params = useParams()
    const { setModalContent, setOnModalClose, closeModal } = useModal();

    console.log(params)

    useEffect(() => {
        dispatch(fetchChapter( params.chapterId, params.storyId,))
    },[dispatch, user])
    console.log("STORIES", story)
    if (!story) return null

    console.log((story))

	return (
        <>
        {story.chapter.body}
        </>
	);
}
