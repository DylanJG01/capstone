import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // setErrors(data);
      setErrors(['Invalid Credientials'])
    } else {
        closeModal()
        history.push('/recommended')
    }
  };

  const demoUser = async (e) => {
    await dispatch(login('wraith@aa.io', 'password'))
    closeModal()
    history.push('/recommended')
  }

  return (
    <div className="login-div">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
          <ul className="login-errors">
            {errors.map((error, idx) => (
              <li key={idx} className="error">{error}</li>
            ))}
          </ul>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <button className="log-in" type="submit">Log In</button>
        <div className="demo-button-div">
        <button className="log-in" onClick={() => demoUser()}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
