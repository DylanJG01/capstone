import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchChapter } from '../../store/story';
import { fetchSingleChapter } from '../../store/chapter';
// import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom'

export default function Chapter(){
	const [user, story, chapter] = useSelector(state => [state.session.user, state.stories.singleStory, state.chapters.singleChapter]);
    const dispatch = useDispatch()
    const params = useParams()

    // const { setModalContent, setOnModalClose, closeModal } = useModal();

    console.log(params)

    useEffect(() => {
        dispatch(fetchSingleChapter( params.chapterId))

    },[dispatch, user, params.chapterId, params.storyId])
    console.log("STORIES", story)
    if (!chapter) return null

    console.log((chapter))

	return (
        <>
        {chapter.body}
        </>
	);
}
