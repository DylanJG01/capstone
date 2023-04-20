// constants
const GET_STORY = "stories/GET_STORY";
const GET_STORIES_BY_USER_TAG = "stories/GET_STORIES_FOR_USER"

export const storiesForUser = (stories) => ({
	type: GET_STORIES_BY_USER_TAG,
	stories
});


export const fetchStoriesForUser = () => async dispatch => {
    const res = await fetch('/api/stories/recommended')

    if (res.ok){
        const stories = await res.json()
        dispatch(storiesForUser(stories))
    }
}
export const initialState = { storiesForUser: { }, storiesByUser: {}, singleStory: {} };


export default function reducer(state = initialState, action) {
	switch (action.type) {
        case GET_STORIES_BY_USER_TAG: {
            const newState = {...state}
            newState.storiesForUser = action.stories
            return {...newState}
        }
		default:
			return state;
	}
}
