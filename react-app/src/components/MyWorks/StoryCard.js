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
    console.log(story)
    console.log(story)
    console.log(story)
    console.log(story)
    console.log(story)
    console.log(story)

    const deleteStory = (storyId) => {
        dispatch(fetchDeleteStory(storyId))
    }
    return (
    <div key={story.id}>
        {story.title}
        <button class="btn" onClick={() => editTheStory(story.id, story.title)}>Edit</button>
        <button class="btn" onClick={() => deleteStory(story.id)}>Delete</button>
    </div>)
}
