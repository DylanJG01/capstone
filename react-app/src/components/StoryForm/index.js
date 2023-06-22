import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostStory } from "../../store/story";
import { useHistory } from "react-router-dom/";
import { titleToSword, options , titleValidator, descriptionValidator} from "../_helpers";
import { tagBundler } from "../_helpers";
import './StoryForm.css'

export default function StoryFormPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState("");
  const [addTag, setAddTag] = useState(false)
  const [category, setCategory] = useState("None")
  const [mature, setMature] = useState("")
  const [cover, setCover] = useState(null)
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length){
      setSubmitted(true);
      return
    }
    // let newStory = await dispatch(fetchPostStory({title, description, cover: cover, tags: [tag1], 'user_id': user.id}))
    const formData = new FormData();
    const theObj = {
      title,
      description,
      cover,
      tag_list: tags.join(" "),
      category_name: category,
      user_id: user.id,
      mature
    }
    for (const i in theObj){
      if (i !== 'cover'){
        formData.append(`${i}`, theObj[i])
      } else {
        formData.append('the_cover', cover)
      }
    }

    const newStory = await dispatch(fetchPostStory(formData))

    history.push(`/myworks/${newStory.id}-${titleToSword(newStory.title)}`)
    // history.push(`/myworks/${newStory.id}-${titleToSword(newStory.title)}/chapter/new`)
    // I THINK I WANT THIS TO CREATE A NEW STORY AND A NEW CHAPTER,
    // THEN WE CAN RUN A PUT REQUEST ON THE CHAPTER.
    }

  useEffect(() => {
    const ve = [] //Validation Errors
    setErrors([])
    if(titleValidator(title)) ve.push(titleValidator(title))
    if(description && (descriptionValidator(description))) ve.push((descriptionValidator(description)))
    if(ve.length) setErrors(ve)
    console.log(tags)
  },[title, description, tags])

  const changeRating = () => {
    mature ? setMature(false) : setMature(true)
  }

  const remove_tag = (e, tag) => {
    e.preventDefault()
    e.stopPropagation()
    const tempArr = tags.filter(el => el !== tag)
    setTags(tempArr)
  }

  return (
    <div>
      <h2 className="ctr">Story Details</h2>
      <div className="story-form-div">

        <div className="cover-div">
        </div>
        <div className="form-div">
        <form className="new-story-form" onSubmit={handleSubmit} encType="multipart/form-data" >
          <label className="label">
            <div>Title
              {submitted && errors.includes("title-short") && (<span className="error red">Title must a least 1 character.</span >)}
              {submitted && errors.includes("title-long") && (<span className="error red">Title must a less than 100 character.</span >)}
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
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </label>
          <label className="label">
          <div className="story-category-selection-div">
            <h5>Which category best fits your story?</h5>
            <select className="story-category-selector" value={category} onChange={(e) => setCategory(e.target.value)}>
              {options.map(option => <option>{option}</option>)}
            </select>
          </div>
          </label>
          <label className="label">
          <div className="story-category-selection-div">
            <h5>Which tags best fits your story?</h5>
            <div className="tag-area">
            {tags?.length > 0 && tags.map(el => (
            <div className="tag" onClick={(e) => remove_tag(e, el)}>
              {el}
              <div className={'x'}>x</div>
            </div>
            ))}
            </div>
              { !addTag ? <div className="tag" onClick={() => setAddTag(true)}>+ Add Tag</div>:
              <div className="input-tag-div">
                <input
                className="tag-input"
                type="text"
                value={tag}
                onChange={(e) => tagBundler(e, tag, tags, setTag, setTags)}
                onBlur={() => setAddTag(false)}
              />
              </div>}
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
          <button className="submit-story-button btn log-in" type="submit">Submit</button>
        </form>
        </div>
      </div>
    </div>
  );
}
