import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostStory } from "../../store/story";

export default function StoryFormPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState("")
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchPostStory({title, description, tags, 'user_id': user.id}))
    //I THINK I WANT THIS TO CREATE A NEW STORY AND A NEW CHAPTER,
    //THEN WE CAN RUN A PUT REQUEST ON THE CHAPTER.

    }

  const changeRating = () => {
    rating ? setRating(false) : setRating(true)
  }

  return (
    <>
      <h2>Story Details</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Story"
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Tags
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <label>
          Rating
          <input
            type="checkbox"
            value={rating}
            onChange={() => changeRating()}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
