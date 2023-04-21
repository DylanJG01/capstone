import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesForUser } from '../../store/story';
import { useModal } from '../../context/Modal';


export default function UserProfile(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesForUser]);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch()
    },[dispatch, user])
    console.log("STORIES", stories)
    if (!stories) return null

    console.log((stories))

	return (
        <>
		PUUUUNK
        </>
	);
}
