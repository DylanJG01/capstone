import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchPutStory, fetchSingleStory, } from "../../store/story";
import { useParams, useHistory } from "react-router-dom";
import { titleToSword, options, titleValidator, descriptionValidator} from "../_helpers";
import { fetchAllChapters, fetchDeleteChapter } from "../../store/chapter";
import SetCost from '../SetCostModal'
import { tagBundler } from "../_helpers";

import './StoryForm.css'

export default function EditStoryForm() {
  const dispatch = useDispatch();
  const [user, story, chapters] = useSelector((state) => [state.session.user, state.stories.singleStory, state.chapters.allChapters]);
  const [title, setTitle] = useState(story?.title || "");
  const [description, setDescription] = useState(story?.description || "");
  // const [tags, setTags] = useState(story?.tags || "");
  const [tags, setTags] = useState(story?.tags || [])
  const [tag, setTag] = useState(story?.tag || "")
  const [category, setCategory] = useState(story?.category_name || "None")
  const [mature, setMature] = useState(story?.mature || false)
  const [cover, setCover] = useState(null)
  // const [theCover, setTheCover] = useState(story?.cover || '')
  const [errors, setErrors] = useState([]);

  const [tab, setTab] = useState('details')
  const [loaded, setLoaded] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [active, setActive] = useState(true)
  const params = useParams()
  const history = useHistory()
  const storyId = parseInt(params.storyId)

  useEffect(() => {
    const load = async () => {
    await dispatch(fetchSingleStory(storyId))
    await dispatch(fetchAllChapters(storyId))
    setLoaded(true)
  }
    load()
    // if (!story) return
  },[dispatch, storyId])

  useEffect(() => {
    if (loaded) {
        setTitle(story.title)
        setDescription(story.description)
        setTags(story.tags)
        setCategory(story.category_name)
        setCover(story.cover)
        setMature(story.mature)
        // setTheCover(story.cover)
    }
  },[story, loaded])

  useEffect(() => {
    const ve = [] //Validation Errors
    setErrors([])
    if(titleValidator(title)) ve.push(titleValidator(title))
    if(description && (descriptionValidator(description))) ve.push((descriptionValidator(description)))
    if(ve.length) setErrors(ve)
  },[title, description])

  useEffect(() => {
    console.log(cover)
}, [cover])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length){
      setSubmitted(true)
      return
    }
    const formData = new FormData();
    const theObj = {
      title,
      description,
      the_cover: cover,
      tag_list: tags.join(" "),
      category_name: category,
      user_id: user.id
    }
    console.log(theObj.tag_list)

    for (const i in theObj){
      if( i !== 'the_cover'){
        formData.append(`${i}`, theObj[i])
      } else {
        formData.append('the_cover', cover)
      }
    }
    dispatch(fetchPutStory(formData, storyId))
    alert("Details Saved")

    // history.push(`/myworks/${story.id}-${titleToSword(title)}`)
    // dispatch(fetchUsersStories(user.username))
    //I THINK I WANT THIS TO CREATE A NEW STORY AND A NEW CHAPTER,
    //THEN WE CAN RUN A PUT REQUEST ON THE CHAPTER.

  }
  const deleteChapter = async (id) => {
    await dispatch(fetchDeleteChapter(id))
    dispatch(fetchSingleStory(storyId))
  }
  const postChapter = async () => {
    // let newChapter = await dispatch(fetchPostChapter({story_id: story.id}))

    // history.push(`/myworks/${story.id}-${titleToSword(story.title)}/${newChapter.id}-${titleToSword(newChapter.title)}`)
    history.push(`/myworks/${story.id}-${titleToSword(story.title)}/chapter/new`)
  }

  if (!loaded) return <h2>Loading...</h2>
  if (!story || !story.allChapters) return <h2>Loading...</h2>

  const changeRating = () => {
    mature ? setMature(false) : setMature(true)
  }
  return (
    <>
        <div>
            <button className='back' onClick={() => history.push('/myworks')}>Back</button>
        </div>
        <div className="details-contents">
          <div className="tab-selector">
              <span className={tab === 'details' ? "active-tab" : ""} onClick={() => setTab('details')}>Story Details</span>
              <span className={tab === 'details' ? "" : "active-tab"} onClick={() => setTab('contents')}>Table of Contents</span>
          </div>
        </div>
        {tab === "details" && (<>
          <div className="story-form-div">
            <div className="cover-img-divz">
              <img className="story-form-img"
              src={story.cover}
              alt={`${title} cover`}
              onError={e => { e.currentTarget.src = "https://images.nightcafe.studio/jobs/kyupaCPTO8Lm1jh1Kw8P/kyupaCPTO8Lm1jh1Kw8P--2--r15eb.jpg?tr=w-1600,c-at_max"; }}
              />
            </div>
          <div className="form-div">
          <form onSubmit={handleSubmit} className="new-story-form">
          {/* <ul>
            {submitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul> */}
          <label className="label">
            <div>Title
              {submitted && errors.includes('title-short') && (<span className="error">Title must be over 0 characters</span>)}
              {submitted && errors.includes('title-long') && (<span className="error">Title must be under 100 characters</span>)}
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle((e.target.value).replace(/^\s+/, ''))}
              placeholder="Title"
            />
          </label>
          <label className="label">
          <div>Description
          {submitted && errors.includes('des-long') && (<span className="error"> must be shorter than 2000 characters</span>)}

          </div>
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
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </label>
          <label className="label">
          <div className="story-tag-selection-div">
            <h5>Which category best fits your story?</h5>
            <select className="story-tag-selector" value={category} onChange={(e) => setCategory(e.target.value)}>
              {options.map(option => <option>{option}</option>)}
            </select>
          </div>
          </label>
          <label className="label">
          <div className="story-category-selection-div">
            <h5>Which tags best fits your story?</h5>
            <div className="tag-area">
            {tags?.length > 0 && tags.map(el => (
            <div className="tag">
              {el}
              {console.log(tags)}
            </div>

            ))}
            <input
              type="text"
              value={tag}
              onChange={(e) => tagBundler(e, tag, tags, setTag, setTags)}
            />
            </div>
          </div>
          </label>
          <label className="label mature">
            Mature Content:
            <input
              type="checkbox"
              value={mature}
              onChange={() => changeRating()}
            />
          </label>
          <button className="submit-story-button btn log-in" type="submit">Save</button>
        </form>
        </div>
      </div>
        </>)}
        { tab === "contents" ? (<>
            <div className="table-of-contents-div">
              <div className="table-of-contents">
              <button onClick={() => postChapter()}>New Part</button>
                {chapters && Object.values(chapters).map((chapter, i )=> (
                    <li className="chapter-li" key={`chapter${chapter.id}`}>
                        <p className="the-h3">{chapter.title}</p>
                        {i ? <>
                        <div>{chapter.cost}</div>
                        <SetCost chapter={chapter} user={user}/>
                        </> :
                        <div> First chapter always free </div>
                        }
                        <div className="button-container">
                        <button className='btn edit' onClick={() => history.push(`${story.id}-${titleToSword(title)}/${chapter.id}-${titleToSword(chapter.title)}`)}><i class="fa-solid fa-pen-to-square"></i></button>
                        <button className="btn delete" onClick={() => deleteChapter(chapter.id)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </li>
                ))}
              </div>
            </div>
        </>) : null
        }
    </>
  );
}
