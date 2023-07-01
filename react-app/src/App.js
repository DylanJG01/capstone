import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import RecommendedStories from "./components/Story/RecommendedStories";
import Chapter from './components/Chapter'
import StoryFormPage from "./components/StoryForm";
import MyWorks from './components/MyWorks'
import EditStoryForm from "./components/StoryForm/EditStoryForm";
import EditChapter from "./components/Chapter/EditChapter"
import AllStories from "./components/AllStories";
import FourOhFour from "./components/FourOhFour";
import NewChapter from "./components/Chapter/NewChapter"
import SplashPage from "./components/Splash";
// import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
          <Route path='/recommended' exact={true}>
            <RecommendedStories />
          </Route>
          <Route path='/all' exact={true}>
            <AllStories />
          </Route>
          <Route path="/login" exact={true} >
            <LoginFormPage />
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <Route path='/stories/:storyId/chapter/:chapterId' exact={true}>
            <Chapter />
          </Route>
          {/* <Route path='/stories/:storyId' exact={true}>
            <SingleStory />
          </Route> */}
          <Route path='/myworks/new' exact={true}>
            <StoryFormPage />
          </Route>
          <Route path='/myworks/:storyId/chapter/new' exact={true}>
            <NewChapter />
          </Route>
          <Route path='/myworks/:storyId/:chapterId' exact={true}>
            <EditChapter />
          </Route>
          <Route path='/myworks/:storyId' exact={true}>
            <EditStoryForm />
          </Route>
          <Route path='/myworks' exact={true}>
            <MyWorks />
          </Route>
          {/* <Route path='/user/:username'>
            <UserProfile />
          </Route> */}
          <Route path='/' >
            <FourOhFour />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
