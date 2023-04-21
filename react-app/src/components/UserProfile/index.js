import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStories } from '../../store/story';
import { useModal } from '../../context/Modal';


export default function UserProfile(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesByUser]);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchUsersStories())
    },[dispatch, user])
    console.log("STORIES", stories)
    if (!stories) return null

    console.log((stories))

	return (
        <>
        THIS WILL RETURN A LIST OF STORYCARDS THAT YOU CAN USE TO
        INTERACT WITH STORY (DELETE/EDIT)
		{Object.values(stories).map(el => (
        <li>{el.cost} {el.title}</li>
        ))}
        </>
	);
}
