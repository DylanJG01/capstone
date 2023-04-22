import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStories, fetchDeleteStory } from '../../store/story';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom'
import { titleToSword } from './_helpers';

export default function MyWorks(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesByUser]);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!user) return
        dispatch(fetchUsersStories(user.username))
    },[dispatch, user])
    // console.log("STORIES", stories)
    if (!user) return <h2>You are not logged in! Without knowing who you are, we cannot find your stories!</h2>
    if (!stories) return <h2>You ain't got none stories, friend. So we got nothin' to sho ya</h2>

    const deleteStory = (storyId) => {
        dispatch(fetchDeleteStory(storyId))
    }

	return (
        <>
		{Object.values(stories).map(story => (
        <li>{story.cost} {story.title}
        <button onClick={() => history.push(`/myworks/${story.id}-${titleToSword(story.title)}`)}>Edit</button>
        <button onClick={() => deleteStory(story.id)}>Delete</button>
        </li>
       ))}
        </>
	);
}
