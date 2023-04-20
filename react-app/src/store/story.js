// constants
const GET_STORY = "stories/GET_STORY";
const GET_STORIES_BY_USER_TAG = "stories/GET_STORIES_FOR_USER"

const GET_CHAPTER = "chapters/GET_CHAPTER"

export const storyWithChapter = story => ({
    type: GET_CHAPTER,
    story
})

export const fetchChapter = (chapterId, storyId ) => async dispatch => {
    const res = await fetch(`/api/stories/${storyId}/chapter/${chapterId}`)

    if(res.ok){
        const story = await res.json()
        console.log(story)
        dispatch(storyWithChapter(story))
    }
}

export const storiesForUser = (stories) => ({
	type: GET_STORIES_BY_USER_TAG,
	stories
});

export const singleStory = story => ({
    type: GET_STORY,
    story
})

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
            console.log("NEWSTATE", newState)
            return {...newState}
        }
        case GET_CHAPTER : {
            const newState = {...state}
            newState.singleStory = action.story
            return {...newState}
        }
		default:
			return state;
	}
}
