import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import RecommendedStories from "./components/Story/RecommendedStories";
import SingleStory from './components/SingleStory'
import Chapter from './components/Chapter'
import StoryFormPage from "./components/StoryForm";
import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/' exact={true}>
            <RecommendedStories />
          </Route>
          <Route path='/stories/:storyId/chapter/:chapterId' exact={true}>
            <Chapter />
          </Route>
          <Route path='/stories/:storyId' exact={true}>
            <SingleStory />
          </Route>
          <Route path='/myworks/new' exact={true}>
            <StoryFormPage />
          </Route>
          <Route path='/user/'>
            <UserProfile />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
