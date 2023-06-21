import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import "./SignupForm.css";
import { _usernameValidator, _emailValidator, _passwordValidator } from "../_helpers";
import { options } from '../_helpers'

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [tag1, setTag1] = useState("None")
	const [tag2, setTag2] = useState("None")
	const [tag3, setTag3] = useState("None")
	const [errors, setErrors] = useState([]);
	const [submitted, setSubmitted] = useState(false)
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (errors.length) {
			setSubmitted(true)
			return
		}
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, tag1, tag2, tag3));
			if (data) {
				if (data.includes('email : Email address is already in use.')) {
					setErrors(["Email in use"])
				}
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	useEffect(() => {
		const validatonErrors = []
		if (_emailValidator(email)) validatonErrors.push('Invalid Email')
		if (_usernameValidator(username)) {
			validatonErrors.push(_usernameValidator(username))
		}
		if (_passwordValidator([password, confirmPassword])){
			let x = _passwordValidator([password, confirmPassword])
			if (x){
				x.forEach(i => validatonErrors.push(i))
			}
		}
		if (validatonErrors.length){
			setErrors(validatonErrors)
		} else {
			setErrors([])
		}
	},[email, username, password, confirmPassword])

	const demoUser = async (e) => {
		dispatch(login('wraith@aa.io', 'password'))
		closeModal()
	}

	return (
		<div className="signup-form-div">
			<h1>Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul>
					{/* {submitted && errors.map((error, idx) => (
						<li className='error' key={idx}>{error}</li>
					))} */}
				</ul>
				<label>
					{submitted && errors.includes('Invalid Email') && <span className="zzz">Invalid Email</span>}
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</label>
				<label>
					{submitted && errors.includes('un-short') && <span className="zzz">Username too short</span>}
					{submitted && errors.includes('un-long') && <span className="zzz">Username too long</span>}
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				<label>
					{submitted && errors.includes('pass') && <span className="zzz">Password too short</span>}
					{submitted &&
					!errors.includes('pass') &&
					!errors.includes('cpass') &&
					errors.includes('pmatch') &&
					<span className="zzz">Passwords must match</span>}
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</label>
				<label>
					{submitted && errors.includes('cpass') && <span className="zzz">Password too short</span>}
					{submitted &&
					!errors.includes('pass') &&
					!errors.includes('cpass') &&
					errors.includes('pmatch') &&
					<span className="zzz">Passwords must match</span>}
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				<div className="tag-selection-div">
					<h5>Select up to three tags</h5>
					<h5>you like to read</h5>
					<select className="tag-selector" value={tag1} onChange={(e) => setTag1(e.target.value)}>
						{options.map(option => <option>{option}</option>)}
					</select>
					<select className="tag-selector" value={tag2} onChange={(e) => setTag2(e.target.value)}>
						{options.map(option => <option>{option}</option>)}
					</select>
					<select className="tag-selector" value={tag3} onChange={(e) => setTag3(e.target.value)}>
						{options.map(option => <option>{option}</option>)}
					</select>
				</div>
				<button className="signup-button" type="submit">Sign Up</button>
				<div className="demo-button-div">
				<button className="demo-user-button" onClick={() => demoUser()}>Demo User</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
