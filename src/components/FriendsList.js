import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image, Menu, Input
} from 'semantic-ui-react';
import { getSearchedUser, getUserFriends, mergeUserFriendInfo } from '../helpers/data/userFriendData';
import { getCurrentUsersUid } from '../helpers/data/userData';

const NavMenu = () => {
  const uid = getCurrentUsersUid();
  const [friendList, setFriendsList] = useState([]);
  useEffect(() => {
    getUserFriends(uid).then((x) => mergeUserFriendInfo(x).then(setFriendsList));
  }, []);
  const FriendCard = ({ ...friendInfo }) => (
    <Menu.Item
        id={friendInfo.id}
        className='menu-item'
        name={friendInfo.username}
      >
      <Image avatar src={friendInfo.profileImage} className='menu-item-image'/>
      <span> {friendInfo.username}</span>
   </Menu.Item>
  );
  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      getSearchedUser(e.target.value, uid).then(() => {
        getUserFriends(uid).then((x) => mergeUserFriendInfo(x).then(setFriendsList));
      });
    }
  };

  return (
      <Menu vertical fixed='right' className='nav-menu'>
        <Menu.Item position='left'>
        <Input icon='users' iconPosition='left' placeholder='Search users...' onKeyDown={handleSubmit}/>
          <Menu.Header className='category-header'>Friends List</Menu.Header>
          {friendList.map((friendInfo) => <FriendCard key={friendInfo.id} {...friendInfo}/>)}
        </Menu.Item>
      </Menu>
  );
};

const FriendsList = ({ user }) => (
    <div className='nav-container'>
      { user && <NavMenu user={user}/>}
    </div>
);
FriendsList.propTypes = {
  user: PropTypes.any
};
NavMenu.propTypes = {
  user: PropTypes.any
};
export default FriendsList;
