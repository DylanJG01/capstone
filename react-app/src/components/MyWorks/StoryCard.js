import React, { useEffect, useState} from 'react';
import { fetchDeleteStory } from '../../store/story';
import { titleToSword } from '../_helpers';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function StoryCard({story}){
    const dispatch = useDispatch()
    const history = useHistory()
    const editTheStory = async (id, title) => {
        // await dispatch(fetchSingleStory(id))
        history.push(`/myworks/${id}-${titleToSword(title)}`)
    }

    const deleteStory = (storyId) => {
        dispatch(fetchDeleteStory(storyId))
        return alert("This is to remind the devloper to put an 'are you sure?' modal in here for final production")
    }
    return (
    <div className='story-card-div' key={story.id}>
        <div class="img-div">
            <img src={story.cover}
              alt={`${story.cover} title`}
              onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
            />
        </div>
        <div>
        <div className='title'>
        <p>{story.title}</p>
        </div>
        <div className='the-buttons'>
        <button class="btn edit" onClick={() => editTheStory(story.id, story.title)}><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn delete" onClick={() => deleteStory(story.id)}><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>
    </div>)
}
