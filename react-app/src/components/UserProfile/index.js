import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStories } from '../../store/story';
import { useHistory, useParams } from 'react-router-dom'

export default function UserProfile(){
	const [user, stories] = useSelector(state => [state.session.user, state.stories.storiesByUser]);
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        dispatch(fetchUsersStories(params.username))
    },[dispatch, user, params.username])
    if (!stories) return null

	return (
        <>
        {user && user.id === stories[1]?.user_id ?
        <button onClick={() => history.push('/myworks')}>Edit Icon</button>
        : null }
		{Object.values(stories).map(el => (
        <li>{el.cost} {el.title}</li>
       ))}
        </>
	);
}
