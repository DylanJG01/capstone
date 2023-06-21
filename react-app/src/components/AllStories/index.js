import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/story';
import { useModal } from '../../context/Modal';
import StoryModal from '../Story/StoryModal'
import './AllStories.css'

export default function AllStories(){
	const stories = useSelector(state => state.stories.allStories);
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        dispatch(fetchAllStories())
    },[dispatch])
    // console.log("STORIES", stories)
    if (!stories) return <h2>You ain't got none stories, friend. So we got nothin' to sho ya</h2>

    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }

	return (
        <div className='myworks-div'>
            <h2>All Stories</h2>
        <ul>
		{Object.values(stories).map(story => (
        <li className='story-card-li' onClick={() => theModal(story)}>
            <div>
            <img className='all-story-cover-img'
            src={story.cover}
            alt={story.title}
            key={story.id}
            onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
            />
            {story.cost ? (<div>$$</div>) : <></>}
            </div>
            <div className='all-story-info'>
            <p className='story-title-p'>{story.title}</p>
           <div className='parts'> {!story.numChapters ? <>No Parts</>
                    : story.numChapters === 1 ? <>1 Part</>
                    : <>{story.numChapters} Parts</>}
           </div>
        </div>
        </li>
       ))}
       </ul>
    </div>
	);
}
