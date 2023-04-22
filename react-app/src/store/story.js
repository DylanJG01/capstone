// constants
const GET_STORY = "stories/GET_STORY";
const GET_STORIES_BY_USER_TAG = "stories/GET_STORIES_FOR_USER"
const GET_USERS_STORIES = "stories/GET_USERS_STORIES"
const GET_CHAPTER = "chapters/GET_CHAPTER"
const POST_STORY = "stories/POST_STORY"
const DELETE_STORY = "stories/DELETE_STORY"
const PUT_STORY = "stories/PUT_STORY"

export const putStory = story => ({
    type: PUT_STORY,
    story
})
export const deleteStory = story => ({
    type: DELETE_STORY,
    story
})
export const postStory = story => {
    return {
        type: POST_STORY,
        story
    }
}

export const storyWithChapter = story => {
    return {
    type: GET_CHAPTER,
    story
    }
}

export const storiesForUser = (stories) => {
    return {
	type: GET_STORIES_BY_USER_TAG,
	stories
    }
};

export const singleStory = story => {
    return {
    type: GET_STORY,
    story
    }
}

export const usersStories = stories => {
    return {
        type: GET_USERS_STORIES,
        stories
    }
}

export const fetchChapter = (chapterId, storyId ) => async dispatch => {
    const res = await fetch(`/api/stories/${storyId}/chapter/${chapterId}`)

    if(res.ok){
        const story = await res.json()
        console.log(story)
        dispatch(storyWithChapter(story))
    }
}

export const fetchSingleStory = storyId => async dispatch => {
    const res = await fetch(`/api/stories/${storyId}`)

    if (res.ok){
        const story = await res.json()
        dispatch(singleStory(story))
    }
}

export const fetchStoriesForUser = () => async dispatch => {
    const res = await fetch('/api/stories/recommended')
    if (res.ok){
        const stories = await res.json()
        dispatch(storiesForUser(stories))
    }
}

export const fetchPostStory = (data) => async dispatch => {
    const res = await fetch('/api/stories/', {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok){
        const newStory = await res.json()
        console.log("HIT ME!!!")
        dispatch(postStory(newStory))
        return await res.json()
    }
}
export const fetchPutStory = (data, storyId ) => async dispatch => {
    const res = await fetch(`/api/stories/${storyId}`, {
        method : "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok){
        const newStory = await res.json()
        dispatch(putStory(newStory))
    }
}

export const fetchUsersStories = (username) => async dispatch => {
    const res = await fetch(`/api/stories/${username}`)

    if (res.ok){
        const stories = await res.json()
        dispatch(usersStories(stories))
    }
}
export const fetchDeleteStory = (storyId) => async dispatch => {
    const res = await fetch(`/api/stories/${storyId}`, {
        method : "DELETE",
        headers: {"Content-Type": "application/json"},
    })

    if (res.ok){
        dispatch(deleteStory(storyId))
    }
}

export const initialState = { storiesForUser: { }, storiesByUser: {}, singleStory: { allChapters: {}, singleChapter: {} } };

export default function reducer(state = initialState, action) {
    const newState = {...state}
	switch (action.type) {
        case GET_STORY : {
            newState.singleStory = action.story
            return {...newState}
        }
        case GET_STORIES_BY_USER_TAG: {
            newState.storiesForUser = action.stories
            // console.log("NEWSTATE", newState)
            return {...newState}
        }
        case GET_USERS_STORIES: {
            newState.storiesByUser = action.stories
            return {...newState}
        }
        case GET_CHAPTER : {
            newState.singleStory = action.story
            return {...newState}
        }
        case POST_STORY : {
            newState.singleStory ={ ...action.story}
            return {...newState}
        }
        case DELETE_STORY : {
            delete newState.storiesByUser[action.story]
            return {...newState}
        }
        case PUT_STORY : {
            newState.singleStory = action.story
            return {...newState}
        }
		default:
			return state;
	}
}
