import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, Header, Image, Label, Menu
} from 'semantic-ui-react';

class NavMenu extends Component {
  state = {}

  handleCategoryClick = (e, { name }) => this.setState({ activeCategory: name })

  handleTopicClick = (e, { name }) => this.setState({ activeTopic: name })

  render() {
    const { activeCategory } = this.state;
    const { activeTopic } = this.state;

    return (
      <Menu vertical fixed='left' className='nav-menu'>
        <div>
          <Image src={this.props.user.profileImage} avatar size='tiny' className='navbar-profile-image'/>
          <Header color='black'>{this.props.user.username}</Header>
          <Dropdown text='Account Info'>
            <Dropdown.Menu>
              <Dropdown.Item text='Profile'/>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Menu.Item>
          <Menu.Header className='category-header'>Categories</Menu.Header>
            <Menu.Item
              name='food'
              active={activeCategory === 'food'}
              onClick={this.handleCategoryClick}
            >
            <Image circular avatar src={this.props.user.profileImage}/>
            Food
            <Label color='teal'>1</Label>
            </Menu.Item>
            <Menu.Item
              name='gaming'
              active={activeCategory === 'gaming'}
              onClick={this.handleCategoryClick}
            >
              <Image circular avatar src={this.props.user.profileImage}/>
              Gaming
              <Label color='teal'>5</Label>
            </Menu.Item>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header className='topic-header'>Topics</Menu.Header>
            <Menu.Item
              name='burgers'
              active={activeTopic === 'burgers'}
              onClick={this.handleTopicClick}
            >
              <Image circular avatar src={this.props.user.profileImage}/>
              Burgers
              <Label color='teal'>0</Label>
            </Menu.Item>
            <Menu.Item
              name='vegetarian'
              active={activeTopic === 'vegetarian'}
              onClick={this.handleTopicClick}
              >
                <Image circular avatar src={this.props.user.profileImage}/>
                Vegetarian
                <Label color='teal'>0</Label>
              </Menu.Item>
            <Menu.Item
              name='dinners'
              active={activeTopic === 'dinners'}
              onClick={this.handleTopicClick}
              >
                <Image circular avatar src={this.props.user.profileImage}/>
                Dinner
                <Label color='teal'>12</Label>
              </Menu.Item>
          </Menu.Item>
      </Menu>
    );
  }
}

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
