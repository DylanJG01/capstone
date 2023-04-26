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
    const toStoryDetails = () => {
        history.push(`/story/${story.id}`)
        closeModal()
    }
    // console.log("!!!!!!!",story)
    return (
    <div className="story-details-modal">
    <div className="cover-img-div">
        <img className="cover-img" src={story.cover}/>
    </div>
    <div className="info-modal-div">
        <div>{story.title}</div>
        <div>{story.numChapters} Parts</div>
        <div><button className="btn log-in start" onClick={() => toTheStory()}>Start Reading</button></div>
        <div>{story.description} </div>
        {/* <div onClick={() => toStoryDetails()}>More Details </div> */}
    </div>
    </div>)
}
