import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesForUser } from '../../store/story';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from "../OpenModalButton";
import StoryModal from './StoryModal';
import { useModal } from '../../context/Modal';

import './Story.css'

export default function RecommendedStories(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesForUser]);
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const { setModalContent, setOnModalClose, closeModal } = useModal();
    useEffect(() => {
        dispatch(fetchStoriesForUser())
    },[dispatch])
    console.log("STORIES", stories)
    if (!stories) return null

    console.log((stories))

    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }

	return (
        <>
		<>{Object.entries(stories).map(([genre, stories]) => (
            <div className='recommended'>
                <div key={genre}>
                <h2>{genre}</h2>
                    <ul className='recommended-ul'>{stories.map(story => (
                        <li className='story-img-li' key={story.id}>
                            <img className='story-cover-img'
                            src={story.cover}
                            alt={story.title}
                            key={story.id}
                            onClick={() => theModal(story)}
                            />

                        </li>

                    ))}</ul>
                </div>
            </div>
        ))}</>
        </>
	);
}
