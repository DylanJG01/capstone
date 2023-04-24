import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostStory } from "../../store/story";
import { useHistory } from "react-router-dom/";
import { titleToSword } from "../_helpers";
import './StoryForm.css'


export default function StoryFormPage() {
  const dispatch = useDispatch();
  const [user, story] = useSelector((state) => [state.session.user, state.stories.singleStory]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [mature, setMature] = useState("")
  const [cover, setCover] = useState("")
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newStory = await dispatch(fetchPostStory({title, description, tags, 'user_id': user.id}))
    history.push(`/myworks/${newStory.id}-${titleToSword(newStory.title)}/${newStory.singleChapter.id}-${titleToSword(newStory.singleChapter.title)}`)
    console.log(newStory)
    //I THINK I WANT THIS TO CREATE A NEW STORY AND A NEW CHAPTER,
    //THEN WE CAN RUN A PUT REQUEST ON THE CHAPTER.
    }

  const changeRating = () => {
    mature ? setMature(false) : setMature(true)
  }

  return (
    <div className="story-form-div">
      <h2>Story Details</h2>
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
          {/* <input
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          /> */}
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={10}
          />
        </label>
        <label className="label">
        <div>Tags</div>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags"
          />
        </label>
        <label className="label">
        <div>Cover</div>
          <input
            type="text"
            value={cover}
            onChange={(e) => setTags(e.target.value)}
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
        <button type="submit">Post Story</button>
      </form>
      </div>
    </div>
  );
}
