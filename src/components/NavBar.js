import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, Header, Icon, Image, Loader, Menu
} from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import twLogo from '../Assets/TweetWatchLogo.png';
import { signOutUser } from '../helpers/auth';
import {
  deleteTopic,
  favoriteTopic,
  getCategoryTopics,
} from '../helpers/data/topicData';
import { deleteCategory } from '../helpers/data/categoryTweeterData';

const NavMenu = ({ user, categories, setCategories }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [activeTopic, setActiveTopic] = useState({});
  const handleAccountInfoDropdownClick = (type) => {
    switch (type) {
      case 'profile':
        history.push(`/profile/${user.id}`);
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
    setLoading(true);
    history.push(`/category/${e.target.id}`);
    getCategoryTopics(e.target.id).then((response) => {
      setTopics(response);
      setLoading(false);
    });
  };

  const handleTopicClick = (e, { name }) => {
    setActiveTopic({ activeTopic: name });
    if (e.target.id) {
      history.push(`/topic/${e.target.id}`);
    }
  };
  const CategoryCard = ({ ...categoryInfo }) => {
    const handleClick = (type) => {
      switch (type) {
        case 'edit':
          history.push(`/edit-category/${categoryInfo.id}`);
          break;
        case 'delete':
          history.push('/');
          deleteCategory(categoryInfo.uid, categoryInfo.id).then(setCategories);
          break;
        default:
      }
    };
    return (
      <Menu.Item
        id={categoryInfo.id}
        className="menu-item"
        name={categoryInfo.title}
        active={activeCategory.activeCategory === categoryInfo.title}
        onClick={handleCategoryClick}
      >
        <Image avatar src={categoryInfo.iconUrl} className="menu-item-image" />
        {categoryInfo.title}
        <Dropdown
          icon="ellipsis vertical"
          className="menu-item-dropdown"
          pointing="top right"
        >
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" onClick={() => handleClick('edit')} />
            <Dropdown.Item
              icon="delete"
              onClick={() => handleClick('delete')}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
  };

  const TopicCard = ({ i, ...topicInfo }) => {
    const [topic] = useState({
      id: topicInfo.id,
      searchParams: topicInfo.searchParams,
      title: topicInfo.title,
      iconUrl: topicInfo.iconUrl,
      description: topicInfo.description,
      favorite: topicInfo.favorite,
    });
    const handleClick = (type) => {
      switch (type) {
        case 'edit':
          history.push(`/edit-topic/${topicInfo.id}`);
          break;
        case 'delete':
          history.push(`/category/${topicInfo.categoryId}`);
          deleteTopic(topicInfo.id, topicInfo.categoryId).then(setTopics);
          break;
        case 'favorite':
          favoriteTopic(topic.id, {
            favorite: !topic.favorite,
          }).then(() => getCategoryTopics(topicInfo.categoryId).then(setTopics));
          break;
        default:
      }
    };
    return (
      <Menu.Item
        id={topicInfo.id}
        className="menu-item"
        name={topicInfo.title}
        active={activeTopic.activeTopic === topicInfo.title}
        onClick={handleTopicClick}
      >
        <Icon
          name={topic.favorite ? 'star' : 'outline star'}
          color="yellow"
          className="menu-item-favorite-icon"
          onClick={() => handleClick('favorite')}
        />
        {topicInfo.title}
        <Dropdown
          icon="ellipsis vertical"
          pointing="top right"
          className="menu-item-dropdown-topic"
        >
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" onClick={() => handleClick('edit')} />
            <Dropdown.Item
              icon="delete"
              onClick={() => handleClick('delete')}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
  };
  TopicCard.propTypes = {
    i: PropTypes.number,
  };
  return (
    <Menu vertical fixed="left" className="nav-menu">
      <>
        <div>
          <Link to="/">
            <Image
              src={user.profileImage}
              avatar
              size="tiny"
              className="navbar-profile-image"
            />
          </Link>
          <Header color="black">{user.username}</Header>
          <Dropdown text="Account Info">
            <Dropdown.Menu>
              <Dropdown.Item
                text="Profile"
                icon="user"
                onClick={() => handleAccountInfoDropdownClick('profile')}
              />
              <Dropdown.Item
                text="Saved Tweets"
                icon="book"
                onClick={() => handleAccountInfoDropdownClick('savedTweets')}
              />
              <Dropdown.Item
                text="Favorite Topics"
                icon="star"
                onClick={() => handleAccountInfoDropdownClick('favoriteTopics')}
              />
              <Dropdown.Item
                text="Signout"
                icon="sign-out"
                onClick={() => handleAccountInfoDropdownClick('signout')}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Menu.Item position="left">
          <Menu.Header className="category-header">
            Categories{' '}
            <Link to="/create-category" style={{ textDecoration: 'none' }}>
              <Icon name="plus circle" color="blue" />
            </Link>
          </Menu.Header>
          {categories.map((categoryInfo) => (
            <CategoryCard key={categoryInfo.id} {...categoryInfo} />
          ))}
        </Menu.Item>

        <Menu.Item>
          <Menu.Header className="topic-header">
            Topics{' '}
            <Link to="/create-topic" style={{ textDecoration: 'none' }}>
              <Icon name="plus circle" color="blue" />
            </Link>
          </Menu.Header>
          {topics.map((topicInfo, i) => (
            <TopicCard key={topicInfo.id} i={i} {...topicInfo} />
          ))}
        </Menu.Item>
      </>
      <Loader active={loading && true} />
      <div className="nav-footer">
        <p>
          <a
            href="https://github.com/jrobinson0529/TweetWatch#readme"
            className="nav-footer-link"
          >
            About
          </a>{' '}
          &#8226;{' '}
          <a
            href="https://twitter.com/Jesserobinsons"
            className="nav-footer-link"
          >
            Contact
          </a>
        </p>
        <Image src={twLogo} centered />
      </div>
    </Menu>
  );
};

const NavBar = ({
  user, categories, setCategories, topics, setTopics
}) => (
  <>
    {user && (
      <div className="nav-container">
        <NavMenu
          user={user}
          categories={categories}
          topics={topics}
          setCategories={setCategories}
          setTopics={setTopics}
        />
      </div>
    )}
  </>
);

NavBar.propTypes = {
  user: PropTypes.any,
  categories: PropTypes.array,
  setCategories: PropTypes.func,
  topics: PropTypes.array,
  setTopics: PropTypes.func,
};
NavMenu.propTypes = {
  user: PropTypes.any,
  categories: PropTypes.array,
  setCategories: PropTypes.func,
  topics: PropTypes.array,
  setTopics: PropTypes.func,
};

export default NavBar;
