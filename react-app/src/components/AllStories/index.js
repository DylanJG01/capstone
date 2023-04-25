import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/story';
import { useModal } from '../../context/Modal';
import StoryModal from '../Story/StoryModal'
import { useHistory } from 'react-router-dom';
import './AllStories.css'

export default function AllStories(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.allStories]);
    const dispatch = useDispatch()
    const history = useHistory()
    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        dispatch(fetchAllStories())
    },[dispatch])
    // console.log("STORIES", stories)
    if (!user) return <h2>You are not logged in! Without knowing who you are, we cannot find your stories!</h2>
    if (!stories) return <h2>You ain't got none stories, friend. So we got nothin' to sho ya</h2>


    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }

	return (
        <div className='myworks-div'>
            <h2>All Stories</h2>
        <ul>
		{Object.values(stories).map(story => (
        <li className='story-card-li'>
            <div>
            <img className='all-story-cover-img'
            src={story.cover}
            alt={story.title}
            key={story.id}
            onClick={() => theModal(story)}
            />
            </div>
            <div className='all-story-info'>
            {story.title}
           <div> Parts: {story.numChapters}</div>
            </div>
        </li>
       ))}
       </ul>
        </div>
	);
}
