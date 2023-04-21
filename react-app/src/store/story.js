// constants
const GET_STORY = "stories/GET_STORY";
const GET_STORIES_BY_USER_TAG = "stories/GET_STORIES_FOR_USER"

const GET_CHAPTER = "chapters/GET_CHAPTER"
const POST_STORY = "stories/POST_STORY"

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
        dispatch(postStory(newStory))
    }
}

export const initialState = { storiesForUser: { }, storiesByUser: {}, singleStory: { chapter: {} } };

export default function reducer(state = initialState, action) {
	switch (action.type) {
        case GET_STORY : {
            const newState = {...state}
            newState.singleStory = action.story
            return {...newState}
        }
        case GET_STORIES_BY_USER_TAG: {
            const newState = {...state}
            newState.storiesForUser = action.stories
            // console.log("NEWSTATE", newState)
            return {...newState}
        }
        case GET_CHAPTER : {
            const newState = {...state}
            newState.singleStory = action.story
            return {...newState}
        }
        case POST_STORY : {
            const newState = {...state}
            // console.log("!!!!", newState)
            return {...newState}
        }
		default:
			return state;
	}
}
