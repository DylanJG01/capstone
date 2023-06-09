import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function WriteButton() {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const toNewStory = () => {
    closeMenu()
    history.push('/myworks/new')
  }
  const toMyStories = () => {
    closeMenu()
    history.push('/myworks')
  }
  return (
    <>
      <button className="write-button" onClick={openMenu}>
        Write
      </button>
      <ul className={ulClassName} ref={ulRef}>
            <li className="write-button-li">
                <button onClick={() => toNewStory()}>Create a new story</button>
            </li>
            <li className="">
                <button onClick={() => toMyStories()}>My Stories</button>
            </li>
      </ul>
    </>
  );
}
