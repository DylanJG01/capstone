import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/story';
import { useModal } from '../../context/Modal';
import StoryModal from '../Story/StoryModal'
import './AllStories.css'
import { useHistory } from 'react-router-dom';

export default function AllStories(){
	const stories = useSelector(state => state.stories.allStories);
    const dispatch = useDispatch()
    const history = useHistory();
    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        dispatch(fetchAllStories())
    },[dispatch])
    // console.log("STORIES", stories)
    if (!stories) return <h2>You ain't got none stories, friend. So we got nothin' to sho ya</h2>

    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }

    const byCategory = () => {
        const ans = Object.values(stories).reduce((acc, el) => {
            if (!acc[el.category_name]) acc[el.category_name] = []
            acc[el.category_name].push(el)
            return acc
        }, {})

        return Object.keys(ans).map(key => (
            <ul className='all-stories-ul'>
                <div className='category-div'>{key}</div>
                <div className='stories-by-category'>
                    {ans[key].map(story => (
                        <li className='story-img-li'>
                            <img className='story-cover-img'
                            src={story.cover}
                            alt={story.title}
                            key={story.id}
                            onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
                            onClick={() => theModal(story)}
                            />
                             {story.cost ? (<div className='rel'><i className="fa-solid fa-sack-dollar currency"></i></div>) : <></>}
                        </li>
                ))}
                </div>
            </ul>
        ))
    }

	return (
        <div className='myworks-div recommended-page'>
            <h2 className='all-story-h2'>All Stories</h2>
            <p className='back-to-rec'>Back to <button className=' all-stories-button btn log-in' onClick={() => history.push('/')}>recommended</button></p>
        <div className='recommended-div'>
            <ul className='all-ul'>
            {byCategory()}
            </ul>
        </div>
    </div>
	);
}
