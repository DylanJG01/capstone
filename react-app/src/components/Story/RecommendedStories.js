import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesForUser } from '../../store/story';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Story.css'

export default function RecommendedStories(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesForUser]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStoriesForUser())
    },[dispatch])
    if (!stories) return null

    console.log((stories))


	return (
        <>
		<>{Object.entries(stories).map(([genre, stories]) => (
            <div className='recommended'>
                <div key={genre}>
                <h2>{genre}</h2>
                    <ul className='recommended-ul'>{stories.map(story => (
                        <li className='story-img-li' key={story.id} >
                            <img className='story-cover-img' src={story.cover} alt={story.title} key={story.id} onClick={console.log(story.title)}/>
                        </li>
                    ))}</ul>
                </div>
            </div>
        ))}</>
        </>
	);
}
