import React from "react";
// import { login } from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom"

export default function StoryModal({story, closeModal}) {
    const history = useHistory()
    console.log(story)
    const toTheStory = () => {
        console.log(story.firstChapterId)
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
        <img className="cover-img" src={story.cover}
        onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
        />
    </div>
    <div className="info-modal-div">
        <div className="story-title-modal-div">
            <p>{story.title}</p>
        </div>
        <div className=''> {!story.numChapters ? <>No Parts</>
                    : story.numChapters === 1 ? <>1 Part</>
                    : <>{story.numChapters} Parts</>}
        </div>
        <div>
            {story.numChapters ? (<button className="btn log-in start" onClick={() => toTheStory()}>Start Reading</button>)
            : <div><p className="no-parts">No published content</p></div>}
        </div>

        <div className="description-p">{story.description}</div>
        {/* <div onClick={() => toStoryDetails()}>More Details </div> */}
    </div>
    </div>)
}
