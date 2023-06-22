import React from 'react';
import { fetchDeleteStory } from '../../store/story';
import { titleToSword } from '../_helpers';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useModal } from '../../context/Modal';

export default function StoryCard({story}){
    const dispatch = useDispatch()
    const history = useHistory()
    const { setModalContent, closeModal } = useModal()

    const editTheStory = async (id, title) => {
        // await dispatch(fetchSingleStory(id))
        history.push(`/myworks/${id}-${titleToSword(title)}`)
    }

    const deleteStory = async () => {
        const x = await dispatch(fetchDeleteStory(story.id))
        if (x) {
            setModalContent (
                <div className='coins-modal'>
                Story Successfully Deleted
                <button className='coin-btn btn' onClick={closeModal}>Close</button>
                </div>
            )
            return setTimeout(closeModal, 1500)
        }
        else {
                setModalContent (
                <div> Sorry, something went wrong! </div>
                )
                return setTimeout(closeModal, 1500)
        }
    }

    const deleteStoryModal = () => {
        return setModalContent(
            <div className='delete-story-modal'>
                <h2>Delete Story?</h2>
                <button className='btn' onClick={deleteStory}>Yes</button>
                <button className='btn' onClick={closeModal}>No</button>
            </div>
            )
    }

    return (
    <div className='story-card-div' key={story.id}>
        <div class="img-div">
            <img src={story.cover}
              alt={`${story.cover} title`}
              onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
            />
        </div>
        <div className='title-and-buttons'>
            <div className='title'>
            <p className='title-p'>{story.title}</p>
            </div>
            <div></div>
            <div className='the-buttons'>
                <button class="btn edit" onClick={() => editTheStory(story.id, story.title)}><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn delete" onClick={() => deleteStoryModal()}><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </div>)
}
