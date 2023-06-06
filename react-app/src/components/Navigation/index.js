import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import WriteButton from '../Write';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li className='home-li'>
				<NavLink exact to="/" className="wordwraiths-home">Word Wraiths</NavLink>
			</li>
			{isLoaded && (
				<>

				<li className='profile-li'>
					{sessionUser && <span>{sessionUser.coins}</span>}
					{sessionUser && <span><WriteButton /></span>}
					<span><ProfileButton user={sessionUser} /></span>
				</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
