import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import FriendsList from '../components/FriendsList';
import { getUserCategories } from '../helpers/data/categoryData';

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  // Checking for authenticated users. You must set up firebase authentication for this to work!
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfo = {
          fullName: authed.displayName,
          username: authed.email.split('@gmail.com')[0],
          uid: authed.uid,
          profileImage: authed.photoURL
        };
        setUser(userInfo);
        getUserCategories(userInfo.uid).then(setCategories);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);
  return (
    <div className='App'>
     <Router>
        <NavBar user={user} categories={categories} setCategories={setCategories} topics={topics} setTopics={setTopics}/>
        <FriendsList user={user}/>
        <Routes user={user} categories={categories} setCategories={setCategories} topics={topics} setTopics={setTopics}/>
      </Router>
    </div>
  );
}

export default App;
