import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import PrivateRoute from './PrivateRoute';
import Login from '../views/Login';
import Category from '../views/Category';
import Topic from '../views/Topic';
import CreateCategory from '../views/CreateCategory';
import CreateTopic from '../views/CreateTopic';
import EditCategory from '../views/EditCategory';
import EditTopic from '../views/EditTopic';
import SavedTweets from '../views/SavedTweets';
import FavoriteTopics from '../views/FavoriteTopics';
import Profile from '../views/Profile';

function Routes({
  user,
  setCategories,
  setTopics
}) {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={() => <Login user={user}/>} />
        <PrivateRoute exact path="/" component={() => <Home user={user} />} user={user}/>
        <PrivateRoute exact path="/category/:id" component={() => <Category user={user} />} user={user}/>
        <PrivateRoute exact path="/topic/:id" component={() => <Topic user={user} />} user={user}/>
        <PrivateRoute exact path="/create-category" component={() => <CreateCategory user={user} setCategories={setCategories}/>} user={user}/>
        <PrivateRoute exact path="/create-topic" component={() => <CreateTopic user={user} setTopics={setTopics}/>} user={user}/>
        <PrivateRoute exact path="/edit-category/:id" component={() => <EditCategory user={user} />} user={user}/>
        <PrivateRoute exact path="/edit-topic/:id" component={() => <EditTopic user={user} />} user={user}/>
        <PrivateRoute exact path="/saved-tweets" component={() => <SavedTweets uid={user.uid} />} user={user}/>
        <PrivateRoute exact path="/favorite-topics" component={() => <FavoriteTopics uid={user.uid} />} user={user}/>
        <PrivateRoute exact path="/profile/:uid" component={() => <Profile user={user} />} user={user}/>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
  categories: PropTypes.array,
  setCategories: PropTypes.func,
  topics: PropTypes.array,
  setTopics: PropTypes.func,
};
export default Routes;
