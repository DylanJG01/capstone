import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories, fetchStoriesForUser } from '../../store/story';
import StoryModal from './StoryModal';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom/';
import './Story.css'
import AllStories from '../AllStories';

export default function RecommendedStories(){
	const [user, stories, allStories] = useSelector(state => [state.session.user, state.stories.storiesForUser, state.stories.allStories]);
    const history = useHistory()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [randomStories, setRandomStories] = useState([])
    const { setModalContent, closeModal } = useModal();
    useEffect(() => {
        const load = async () => {
            await dispatch(fetchStoriesForUser())
            await dispatch(fetchAllStories())
            setLoaded(true)
        }
        load()
        setRandomStories(getRandomObjects)
    },[dispatch, user])
    if (!stories) return null

    const theModal = (story) => {
        setModalContent(<StoryModal story={story} closeModal={closeModal}/>)
    }


    function getRandomObjects() {

        const keys = Object.keys(allStories);

        for (let i = keys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = keys[i];
          keys[i] = keys[j];
          keys[j] = temp;
        }

        const selectedKeys = keys.slice(0, 5);

        const selectedObjects = selectedKeys.map(function (key) {
          return allStories[key];
        });

        return selectedObjects;
      }

    if(!loaded){
        return <h2>Loading ...</h2>
    }

	return (
        <div className='recommended-page'>
        <div className='ghost-pic-div'>
        <img className='ghost-pic' alt='spooky-monster' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3166a86b-e1d2-4640-98fa-8144f06dcd5c/dahqgjo-c5483cfe-032a-47f4-b993-003804f7021d.jpg/v1/fill/w_1024,h_1024,q_75,strp/writers_block_by_jhutter_dahqgjo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzMxNjZhODZiLWUxZDItNDY0MC05OGZhLTgxNDRmMDZkY2Q1Y1wvZGFocWdqby1jNTQ4M2NmZS0wMzJhLTQ3ZjQtYjk5My0wMDM4MDRmNzAyMWQuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.T5XuZUHEklUOd0dHJ5lEJK1BI7YF-DASwffJNg0RpF8' />
        <img className='ghost-pic' alt='spooky-monster' src='https://as2.ftcdn.net/v2/jpg/05/68/09/59/1000_F_568095931_XFALmmU7IkUcVve7NqjuqaqeM02ZsiHJ.jpg'/>
        <img className='ghost-pic' alt='spooky-monster' src='https://www.shutterstock.com/shutterstock/photos/2170488347/display_1500/stock-vector-zombie-office-worker-typing-on-a-computer-vector-cartoon-tired-corporate-employee-working-overtime-2170488347.jpg'/>
        </div>

        <div className='welcome'>
        <h2>Welcome to Word Wraiths {user?.username &&<>, {user.username}</>}</h2>
        <p>Phooey to suggestions, show me
        <button className="all-stories-button" onClick={() => history.push('/all')}>All Stories</button>
        </p>
        </div>

        <div className='recommended-div'>
            <>{Object.entries(stories).map(([genre, stories]) => (
                    <div className='recommended' key={genre}>
                    <h2>Becauses {user ? "you": "creatures"} like {genre}</h2>
                        <ul className='recommended-ul'>{stories.map(story => (
                            <li className='story-img-li' key={story.id}>
                                <img className='story-cover-img'
                                src={story.cover}
                                alt={story.title}
                                key={story.id}
                                onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
                                onClick={() => theModal(story)}
                                />
                                {story.cost ? (<div className='rel'><i className="fa-solid fa-sack-dollar currency"></i></div>) : <></>}
                            </li>
                        ))}</ul>
                    </div>
            ))}
            </>
            <div className='random-stories'>

                {!Object.entries(stories).length &&
                <>
                <h3>Because you have no preferred categories, here are five random stories</h3>
                <ul className='recommended-ul'>{(randomStories.map(story => (
                    <li className='story-img-li' key={story.id}>
                    <img className='story-cover-img'
                    src={story.cover}
                    alt={story.title}
                    key={story.id}
                    onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
                    onClick={() => theModal(story)}
                    />
                    {story.cost ? (<div className='rel'><i className="fa-solid fa-sack-dollar currency"></i></div>) : <></>}
                </li>)))}
                </ul>
                </>}
            </div>
        </div>
        </div>
	);
}
