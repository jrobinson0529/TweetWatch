import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, Header, Image, Label, Menu
} from 'semantic-ui-react';

const MenuItemDropdown = () => (
                <Dropdown icon='ellipsis vertical' pointing='left' className='menu-item-dropdown'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
);
const NavMenu = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState({});
  const [activeTopic, setActiveTopic] = useState({});

  const handleCategoryClick = (e, { name }) => {
    setActiveCategory({ activeCategory: name });
  };

  const handleTopicClick = (e, { name }) => setActiveTopic({ activeTopic: name });

  return (
      <Menu vertical fixed='left' className='nav-menu'>
        <div>
          <Image src={user.profileImage} avatar size='tiny' className='navbar-profile-image'/>
          <Header color='black'>{user.username}</Header>
          <Dropdown text='Account Info' pointing='left'>
            <Dropdown.Menu>
              <Dropdown.Item text='Profile'/>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Menu.Item position='left'>
          <Menu.Header className='category-header'>Categories</Menu.Header>
            <Menu.Item
              className='menu-item'
              name='food'
              active={activeCategory.activeCategory === 'food'}
              onClick={handleCategoryClick}
            >
            <Image circular avatar floated='left' src={user.profileImage} className='menu-item-image'/>
            Food
            <MenuItemDropdown/>
            <Label color='teal'>3</Label>
            </Menu.Item>
            <Menu.Item
              name='gaming'
              active={activeCategory.activeCategory === 'gaming'}
              onClick={handleCategoryClick}
            >
              <Image circular avatar floated='left' src={user.profileImage}/>
              Gaming
              <MenuItemDropdown/>
              <Label color='teal'>5</Label>
            </Menu.Item>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header className='topic-header'>Topics</Menu.Header>
            <Menu.Item
              name='burgers'
              active={activeTopic.activeTopic === 'burgers'}
              onClick={handleTopicClick}
            >
              <Image circular avatar floated='left' src={user.profileImage}/>
              Burgers
              <MenuItemDropdown/>
              <Label color='teal'>0</Label>
            </Menu.Item>
            <Menu.Item
              name='vegetarian'
              active={activeTopic.activeTopic === 'vegetarian'}
              onClick={handleTopicClick}
              >
                <Image circular avatar floated='left' src={user.profileImage}/>
                Vegetarian
                <MenuItemDropdown/>
                <Label color='teal'>0</Label>
              </Menu.Item>
            <Menu.Item
              name='dinners'
              active={activeTopic.activeTopic === 'dinners'}
              onClick={handleTopicClick}
              >
                <Image circular avatar floated='left' src={user.profileImage}/>
                Dinner
                <MenuItemDropdown />
                <Label color='teal'>12</Label>
              </Menu.Item>
          </Menu.Item>
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
