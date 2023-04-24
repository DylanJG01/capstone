import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchPutStory, fetchSingleStory,fetchUsersStories } from "../../store/story";
import { useParams, useHistory } from "react-router-dom";
import { titleToSword } from "../_helpers";
import { fetchDeleteChapter, fetchPostChapter } from "../../store/chapter";

export default function EditStoryForm() {
  const dispatch = useDispatch();
  const [user, story] = useSelector((state) => [state.session.user, state.stories.singleStory]);
  const [title, setTitle] = useState(story?.title || "");
  const [description, setDescription] = useState(story?.description || "");
  const [tags, setTags] = useState(story?.tags || "");
  const [mature, setMature] = useState(story?.mature ?? false)
  const [cover, setCover] = useState(story?.cover || '')
  const [errors, setErrors] = useState([]);

  const [tab, setTab] = useState('details')
  const [loaded, setLoaded] = useState(false)
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
        setTags(story.tags)
        setMature(story.mature)
        setCover(story.cover)
    }
  },[story, loaded])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchPutStory({title, description, tags, 'user_id': user.id, mature}, storyId))
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


  return (
    <>
        <div>
            <button onClick={() => history.push('/myworks')}>Back</button>
        </div>
        <div>
            <button onClick={() =>  setTab('details')}>Story Details</button>
            <button onClick={() =>  setTab('contents')}>Table of Contents</button>
        </div>
         {tab === "details" && (<>
        <h3>Story Details</h3>
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
            Mature
            <input
                type="checkbox"
                value={mature}
                checked={mature}
                onChange={() => {setMature(!mature)}}
            />
            </label>
            <label>
            Cover
            <input
                type="text"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
            />
            </label>
            <button type="submit">Save</button>
        </form>
        </>)}

        { tab === "contents" ? (<>
            <button onClick={() => postChapter()}>New Part</button>
            {story.allChapters && Object.values(story?.allChapters).map(chapter => (
                <li className="chapter-li">
                    <h3>{chapter.title}</h3>
                    <button onClick={() => history.push(`${story.id}-${titleToSword(title)}/${chapter.id}-${titleToSword(chapter.title)}`)}>Edit Chapter</button>
                    <button onClick={() => deleteChapter(chapter.id)}>Delete Chapter</button>
                </li>
            ))}
        </>) : null
        }
    </>
  );
}
