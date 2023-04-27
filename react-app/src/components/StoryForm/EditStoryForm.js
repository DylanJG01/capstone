import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchPutStory, fetchSingleStory,fetchUsersStories } from "../../store/story";
import { useParams, useHistory } from "react-router-dom";
import { titleToSword, options, titleValidator, urlChecka} from "../_helpers";
import { fetchDeleteChapter, fetchPostChapter } from "../../store/chapter";
import './StoryForm.css'

export default function EditStoryForm() {
  const dispatch = useDispatch();
  const [user, story] = useSelector((state) => [state.session.user, state.stories.singleStory]);
  const [title, setTitle] = useState(story?.title || "");
  const [description, setDescription] = useState(story?.description || "");
  // const [tags, setTags] = useState(story?.tags || "");
  const [tag1, setTag1] = useState("None")
  const [mature, setMature] = useState(story?.mature ?? false)
  const [cover, setCover] = useState(story?.cover || '')
  const [errors, setErrors] = useState([]);

  const [tab, setTab] = useState('details')
  const [loaded, setLoaded] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const params = useParams()
  const history = useHistory()
  const storyId = parseInt(params.storyId)

  useEffect(() => {
    // console.log(parseInt(params.storyId.slice(0, 2)))
    dispatch(fetchSingleStory(storyId))
    setLoaded(true)
    // if (!story) return
  },[dispatch, storyId])

  useEffect(() => {
    if (loaded) {
        setTitle(story.title)
        setDescription(story.description)
        setTag1(story.tags)
        setMature(story.mature)
        setCover(story.cover)
    }
  },[story, loaded])

  useEffect(() => {
    const ve = [] //Validation Errors
    setErrors([])
    if(titleValidator(title)) ve.push(titleValidator(title))
    if(cover && urlChecka(cover)) ve.push(urlChecka(cover))
    if(ve.length) setErrors(ve)
  },[title, description, cover, tag1])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length){
      setSubmitted(true)
      return
    }
    dispatch(fetchPutStory({title, description, 'user_id': user.id, mature, cover}, storyId))
    history.push(`/myworks/${story.id}-${titleToSword(title)}`)
    dispatch(fetchUsersStories(user.username))
    //I THINK I WANT THIS TO CREATE A NEW STORY AND A NEW CHAPTER,
    //THEN WE CAN RUN A PUT REQUEST ON THE CHAPTER.

  }
  const deleteChapter = async (id) => {
    await dispatch(fetchDeleteChapter(id))
    dispatch(fetchSingleStory(storyId))
  }
  const postChapter = async () => {
    let newChapter = await dispatch(fetchPostChapter({story_id: story.id}))

    history.push(`/myworks/${story.id}-${titleToSword(story.title)}/${newChapter.id}-${titleToSword(newChapter.title)}`)
  }

  if (!loaded) return <h2>Loading...</h2>
  if (!story || !story.allChapters) return <h2>Loading...</h2>

  const changeRating = () => {
    mature ? setMature(false) : setMature(true)
  }

  return (
    <>
        <div>
            <button onClick={() => history.push('/myworks')}>Back</button>
        </div>
        <div className="details-contents">
          <div>
              <span onClick={() =>  setTab('details')}>Story Details</span>
              <span onClick={() =>  setTab('contents')}>Table of Contents</span>
          </div>
        </div>
         {tab === "details" && (<>
          <div className="story-form-div">
      <div className="form-div">
      <form onSubmit={handleSubmit} className="new-story-form">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="label">
          <div>Title</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </label>
        <label className="label">
        <div>Description</div>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={10}
          />
        </label>
        <label className="label">
        <div>Cover</div>
          <input
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="Cover Image Url"
          />
        </label>
        <label className="label mature">
          Mature Content:
          <input
            type="checkbox"
            value={mature}
            onChange={() => changeRating()}
          />
        </label>
        {/* <div className="story-tag-selection-div">
					<h5>Which tag best fits your story?</h5>
					<select className="story-tag-selector" value={tag1} onChange={(e) => setTag1(e.target.value)}>
						{options.map(option => <option>{option}</option>)}
					</select>
        </div> */}
        <button className="submit-story-button btn log-in" type="submit">Save</button>
      </form>
      </div>
    </div>
        </>)}
        { tab === "contents" ? (<>
            <div className="table-of-contents-div">
              <div className="table-of-contents">
              <button onClick={() => postChapter()}>New Part</button>
                {story.allChapters && Object.values(story?.allChapters).map(chapter => (
                    <li className="chapter-li">
                        <h3>{chapter.title}</h3>
                        <button className='btn edit' onClick={() => history.push(`${story.id}-${titleToSword(title)}/${chapter.id}-${titleToSword(chapter.title)}`)}><i class="fa-solid fa-pen-to-square"></i></button>
                        <button className="btn delete" onClick={() => deleteChapter(chapter.id)}><i class="fa-solid fa-trash"></i></button>
                    </li>
                ))}
              </div>
            </div>
        </>) : null
        }
    </>
  );
}
