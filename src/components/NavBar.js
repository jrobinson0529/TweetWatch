import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, Header, Icon, Image, Label, Menu
} from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import twLogo from '../Assets/TweetWatchLogo.png';
import { signOutUser } from '../helpers/auth';

const NavMenu = ({ user }) => {
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState({});
  const [activeTopic, setActiveTopic] = useState({});
  const [categories] = useState([
    {
      id: '12415115',
      title: 'Gaming',
      iconUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '12413314',
      title: 'Food',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    }
  ]);
  const [topics] = useState([
    {
      id: '1141414141515',
      title: 'Burgers',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    },
    {
      id: '12312313213314',
      title: 'Vegetarian',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    },
    {
      id: '1155555',
      title: 'Dinner',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    }
  ]);

  const handleAccountInfoDropdownClick = (type) => {
    switch (type) {
      case 'profile':
        history.push(`/profile/${user.uid}`);
        break;
      case 'savedTweets':
        history.push('/saved-tweets');
        break;
      case 'favoriteTopics':
        history.push('/favorite-topics');
        break;
      case 'signout':
        signOutUser();
        break;
      default:
    }
  };

  const handleCategoryClick = (e, { name }) => {
    setActiveCategory({ activeCategory: name });
    history.push(`/category/${e.target.id}`);
  };

  const handleTopicClick = (e, { name }) => {
    setActiveTopic({ activeTopic: name });
    history.push(`/topic/${e.target.id}`);
  };
  const CategoryCard = ({ ...categoryInfo }) => {
    const handleClick = (type) => {
      switch (type) {
        case 'edit':
          history.push(`/edit-category/${categoryInfo.id}`);
          break;
        case 'delete':
          console.warn('you clicked delete');
          break;
        default:
      }
    };
    return (
          <Menu.Item
              id={categoryInfo.id}
              className='menu-item'
              name={categoryInfo.title}
              active={activeCategory.activeCategory === categoryInfo.title }
              onClick={handleCategoryClick}
            >
            <Image circular avatar floated='left' src={categoryInfo.iconUrl} className='menu-item-image'/>
            {categoryInfo.title}
            <Dropdown icon='ellipsis vertical' pointing='left' className='menu-item-dropdown'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Edit' icon='edit' onClick={() => handleClick('edit')}/>
                    <Dropdown.Item text='Delete' icon='delete' onClick={() => handleClick('delete')}/>
                  </Dropdown.Menu>
                </Dropdown>
            <Label color='teal'>3</Label>
         </Menu.Item>
    );
  };

  const TopicCard = ({ ...topicInfo }) => {
    const handleClick = (type) => {
      switch (type) {
        case 'edit':
          history.push(`/edit-topic/${topicInfo.id}`);
          break;
        case 'delete':
          console.warn('you clicked delete');
          break;
        default:
      }
    };
    return (
    <Menu.Item
        id={topicInfo.id}
        className='menu-item'
        name={topicInfo.title}
        active={activeTopic.activeTopic === topicInfo.title }
        onClick={handleTopicClick}
      >
      <Image circular avatar floated='left' src={topicInfo.iconUrl} className='menu-item-image'/>
      {topicInfo.title}
      <Dropdown icon='ellipsis vertical' pointing='left' className='menu-item-dropdown'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Edit' icon='edit' onClick={() => handleClick('edit')}/>
                    <Dropdown.Item text='Delete' icon='delete' onClick={() => handleClick('delete')}/>
                  </Dropdown.Menu>
                </Dropdown>
      <Label color='teal'>1</Label>
   </Menu.Item>
    );
  };

  return (
      <Menu vertical fixed='left' className='nav-menu'>
        <div>
          <Link to='/'><Image src={user.profileImage} avatar size='tiny' className='navbar-profile-image'/></Link>
          <Header color='black'>{user.username}</Header>
          <Dropdown text='Account Info' pointing='left'>
            <Dropdown.Menu>
              <Dropdown.Item text='Profile' icon='user' onClick={() => handleAccountInfoDropdownClick('profile')}/>
              <Dropdown.Item text='Saved Tweets' icon='book' onClick={() => handleAccountInfoDropdownClick('savedTweets')}/>
              <Dropdown.Item text='Favorite Topics' icon='star' onClick={() => handleAccountInfoDropdownClick('favoriteTopics')}/>
              <Dropdown.Item text='Signout' icon='sign-out' onClick={() => handleAccountInfoDropdownClick('signout')}/>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Menu.Item position='left'>
          <Menu.Header className='category-header'>Categories <Link to='/create-category' style={{ textDecoration: 'none' }}><Icon name='plus circle' color='blue'/></Link></Menu.Header>
          {categories.map((categoryInfo) => <CategoryCard key={categoryInfo.id} {...categoryInfo}/>)}
        </Menu.Item>

        <Menu.Item>
          <Menu.Header className='topic-header'>Topics <Link to='/create-topic' style={{ textDecoration: 'none' }}><Icon name='plus circle' color='blue'/></Link></Menu.Header>
            {topics.map((topicInfo) => <TopicCard key={topicInfo.id} {...topicInfo}/>)}
          </Menu.Item>
          <div className='nav-footer'>
            <p><a href='https://github.com/jrobinson0529/TweetWatch#readme' className='nav-footer-link'>About</a> &#8226; <a href='https://twitter.com/Jesserobinsons' className='nav-footer-link'>Contact</a></p>
           <Image src={twLogo} centered/>
          </div>
      </Menu>
  );
};

const NavBar = ({ user }) => {
  console.warn(user);
  return (
    <div className='nav-container'>
      { user && <NavMenu user={user}/>}
    </div>
  );
};
NavBar.propTypes = {
  user: PropTypes.any
};
NavMenu.propTypes = {
  user: PropTypes.any
};
export default NavBar;
