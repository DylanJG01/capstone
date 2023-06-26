import React from "react";
import { useHistory } from "react-router-dom"

export default function StoryModal({story, closeModal}) {
    const history = useHistory()

    const toTheStory = () => {

        history.push(`/stories/${story.id}/chapter/${story.firstChapterId}`)
        closeModal()
    }

    return (
    <div className="story-details-modal">
        <div className="cover-img-div">
            <img className="cover-img" alt='book-cover' src={story.cover}
            onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
            />
        </div>
        <div className="info-modal-div">
            <div className="story-title-modal-div">
                <p>{story.title}</p>
            </div>
            <div className="parts-and-start">
                <div className='parts rel'> {!story.numChapters ? <>No Parts</>
                            : story.numChapters === 1 ? <>1 Part</>
                            : <>{story.numChapters} Parts {story.cost ?<i className="fa-solid fa-sack-dollar money-bag" /> : ""}</>}
                </div>
                <div>
                    {/* {story.numChapters ? (<button className="btn log-in start" onClick={() => toTheStory()}>Start Reading</button>)
                    : <div><p className="no-parts">No published content</p></div>} */}

                    {story.numChapters ? (story.cost ? (<button className="btn log-in start" onClick={() => toTheStory()}>Free Preview</button>) :
                        (<button className="btn log-in start" onClick={() => toTheStory()}>Start Reading</button>) ) : null}
                </div>
            </div>
            <div>Description</div>
            <div className="description-p">{story.description}</div>
            <div className="avg-rating">Avg rating {(story.avg).toFixed(1)}</div>
            {/* <div onClick={() => toStoryDetails()}>More Details </div> */}
        </div>
    </div>)
}
