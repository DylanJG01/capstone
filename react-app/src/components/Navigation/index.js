import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import WriteButton from '../Write';
import PurchaseCoinsModal from '../PurchaseCoins';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			{sessionUser ? <li className='home-li'>
				<NavLink exact to="/recommended" className="wordwraiths-home">Word Wraiths</NavLink>
			</li> :
			<li className='home-li'>
				<NavLink exact to="/" className="wordwraiths-home">Word Wraiths</NavLink>
			</li>
			}
			{isLoaded && (
				<>
				<li className='profile-li'>
					{sessionUser && <span><PurchaseCoinsModal user={sessionUser}/></span>}

					{sessionUser && <span className='write-button-span'><WriteButton /></span>}
					<span><ProfileButton user={sessionUser} /></span>
				</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
