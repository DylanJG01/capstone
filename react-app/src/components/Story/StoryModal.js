import React from "react";
// import { login } from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom"

export default function StoryModal({story, closeModal}) {
    const history = useHistory()

    const toTheStory = () => {
        history.push(`/stories/${story.id}/chapter/${story.firstChapterId}`)
        closeModal()
    }
    console.log("!!!!!!!",story)
    return (<>
    <button onClick={() => toTheStory()}>Click me baby, one more time</button>
    {story.title}
    {story.description}

    </>)
}
