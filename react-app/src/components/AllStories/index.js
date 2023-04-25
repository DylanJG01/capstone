import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/story';
import StoryCard from '../MyWorks/StoryCard'

export default function AllStories(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.allStories]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllStories())
    },[dispatch])
    // console.log("STORIES", stories)
    if (!user) return <h2>You are not logged in! Without knowing who you are, we cannot find your stories!</h2>
    if (!stories) return <h2>You ain't got none stories, friend. So we got nothin' to sho ya</h2>

	return (
        <div className='myworks-div'>
            <h2>All Stories</h2>
        <ul>
		{Object.values(stories).map(story => (
        <li className='story-card-li'>{story.title}</li>
       ))}
       </ul>
        </div>
	);
}
