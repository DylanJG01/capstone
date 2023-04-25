import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesForUser } from '../../store/story';
import StoryModal from './StoryModal';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom/';
import './Story.css'

export default function RecommendedStories(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesForUser]);
    const history = useHistory()
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal();
    useEffect(() => {
        dispatch(fetchStoriesForUser())
    },[dispatch, user])
    console.log("STORIES", stories)
    if (!stories) return null

    // console.log((stories))

    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }

	return (
        <div>
        <div className='welcome'>
        <h2>Welcome to Word Wraiths {user?.username &&<>, {user.username}</>}</h2>
        <p>Phooey to your suggestions, show me
        <button onClick={() => history.push('/all')}>All Stories</button>
        </p>

        </div>
        <div className='recommended-div'>
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
        </div>
        </div>
	);
}
