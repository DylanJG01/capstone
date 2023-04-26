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
        <div className='recommended-page'>
        <div className='ghost-pic-div'>
        <img className='ghost-pic' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3166a86b-e1d2-4640-98fa-8144f06dcd5c/dahqgjo-c5483cfe-032a-47f4-b993-003804f7021d.jpg/v1/fill/w_1024,h_1024,q_75,strp/writers_block_by_jhutter_dahqgjo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzMxNjZhODZiLWUxZDItNDY0MC05OGZhLTgxNDRmMDZkY2Q1Y1wvZGFocWdqby1jNTQ4M2NmZS0wMzJhLTQ3ZjQtYjk5My0wMDM4MDRmNzAyMWQuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.T5XuZUHEklUOd0dHJ5lEJK1BI7YF-DASwffJNg0RpF8' />
        <img className='ghost-pic' src='https://as2.ftcdn.net/v2/jpg/05/68/09/59/1000_F_568095931_XFALmmU7IkUcVve7NqjuqaqeM02ZsiHJ.jpg'/>
        <img className='ghost-pic' src='https://www.shutterstock.com/shutterstock/photos/2170488347/display_1500/stock-vector-zombie-office-worker-typing-on-a-computer-vector-cartoon-tired-corporate-employee-working-overtime-2170488347.jpg'/>
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
                            onClick={() => theModal(story)}
                            />
                        </li>
                    ))}</ul>
                </div>
        ))}</>
        </div>
        </div>
	);
}
