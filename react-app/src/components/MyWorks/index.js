import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStories } from '../../store/story';
import StoryCard from './StoryCard'
import './MyWorks.css'

export default function MyWorks(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesByUser]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) return
        dispatch(fetchUsersStories(user.username))
    },[dispatch, user])
    // console.log("STORIES", stories)
    if (!user) return <h2>You are not logged in! Without knowing who you are, we cannot find your stories!</h2>
    if (!stories) return <h2>You ain't got none stories, friend. So we got nothin' to sho ya</h2>

	return (
        <div className='myworks-div'>
            <h2>My Stories</h2>
        <ul>
		{Object.values(stories).map(story => (
        <li className='story-card-li'><StoryCard story={story}/></li>
       ))}
       </ul>
        </div>
	);
}
