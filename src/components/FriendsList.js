import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image, Menu
} from 'semantic-ui-react';

const NavMenu = ({ user }) => {
  const [friendList] = useState([
    {
      id: 12123,
      username: 'BobbyMagic',
      imageUrl: user.profileImage,
    },
    {
      id: 12313215113245,
      username: 'jROB',
      imageUrl: user.profileImage,
    },
    {
      id: 1231315151345,
      username: 'ilovedogs',
      imageUrl: user.profileImage,
    },
    {
      id: 1213131313345,
      username: 'constnatine99',
      imageUrl: user.profileImage,
    },
    {
      id: 12345,
      username: 'xXSeperationAnxietyXx',
      imageUrl: user.profileImage,
    }
  ]);
  const FriendCard = ({ ...friendInfo }) => (
    <Menu.Item
        id={friendInfo.id}
        className='menu-item'
        name={friendInfo.title}
      >
      <Image circular avatar floated='left' src={friendInfo.imageUrl} className='menu-item-image'/>
      {friendInfo.username} is tracking Dogs.
   </Menu.Item>
  );

  return (
      <Menu vertical fixed='right' className='nav-menu'>
        <Menu.Item position='left'>
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
