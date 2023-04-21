import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesForUser } from '../../store/story';
import StoryModal from './StoryModal';
import { useModal } from '../../context/Modal';

import './Story.css'

export default function UserProfile(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesForUser]);
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal();
    useEffect(() => {
        dispatch()
    },[dispatch, user])
    console.log("STORIES", stories)
    if (!stories) return null

    console.log((stories))

    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }

	return (
        <>
		PUUUUNK
        </>
	);
}
