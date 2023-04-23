const GET_CHAPTER = 'chapters/GET_CHAPTER'
const GET_ALL_STORY_CHAPTERS = 'chapters/GET_STORY_CHAPTERS'
const POST_CHAPTER = 'chapters/POST_CHAPTER'
const EDIT_CHAPTER = 'chapters/PUT_CHAPTER'
const DELETE_CHAPTER = 'chapters/DELETE_CHAPTER'

export const getChapter = chapter => ({
    type: GET_CHAPTER,
    chapter
})

export const getAllChapters = chapters => ({
    type: GET_ALL_STORY_CHAPTERS,
    chapters
})

export const postChapter = chapter => ({
    type: POST_CHAPTER,
    chapter
})

export const editChapter = chapter => ({
    type: EDIT_CHAPTER,
    chapter
})

export const deleteChapter = chapter => ({
    type: DELETE_CHAPTER,
    chapter
})

export const fetchSingleChapter = chapterId => async dispatch => {
    const res = await fetch(`/api/chapters/${chapterId}`)
    if (res.ok) {
        const chapter = await res.json()
        console.log(chapter)
        dispatch(getChapter(chapter))
    }
}

export const fetchAllChapters = storyId => async dispatch  => {
    const res = await fetch(`/api/chapters/all/${storyId}`)
    if (res.ok){
        const chapters = await res.json()
        dispatch(getAllChapters(chapters))
    }
}

export const fetchPostChapter = chapterData => async dispatch => {
    const res = await fetch('/api/chapters/new', {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(chapterData)
    })
    if (res.ok){
        const newChapter = await res.json()
        dispatch(postChapter(newChapter))
        return newChapter
    }
}

export const fetchPutChapter = (chapterData, chapterId) => async dispatch => {
    const res = await fetch(`/api/chapters/${chapterId}`, {
        method : "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(chapterData)
    })
    if (res.ok){
        const newChapter = await res.json()
        dispatch(postChapter(newChapter))
        return newChapter
    }
}

export const fetchDeleteChapter = chapterId => async dispatch => {
    const res = await fetch(`/api/chapters/${chapterId}`, {
        method : "DELETE",
        headers: {"Content-Type": "application/json"},
    })

    if (res.ok){
        dispatch(deleteChapter(chapterId))
    }
}

export const initialState = { singleChapter: {}, allChapters: {}}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case GET_CHAPTER: {
            console.log(action)
            console.log(action)
            console.log(action)
            console.log(action)
            return {
                ...state,
                allChapters: {...state.allChapters},
                singleChapter: {...action.chapter}
            }
        }
        case GET_ALL_STORY_CHAPTERS: {
            return {
                ...state,
                allChapters: action.chapters,
                singleChapter: {...state.singleChapter}
            }
        }
        case POST_CHAPTER: {
            return {
                ...state,
                allChapters: {...state.allChapters},
                singleChapter: action.chapter
            }
        }
        case EDIT_CHAPTER: {
            return {
                ...state,
                allChapters: {...state.allChapters},
                singleChapter: action.chapter
            }
        }
        case DELETE_CHAPTER: {
            const newState = {
                ...state,
                allChapters: {...state.allChapters},
                singleChapter: {...state.singleChapter}
            }
            delete newState[action.chapter]
            return newState
        }
        default: return {...state}
    }
}
