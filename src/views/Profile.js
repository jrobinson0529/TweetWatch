import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Image, Form, TextArea, Divider
} from 'semantic-ui-react';
import StyledHeader from '../components/styled_components/StyledHeader';
import PageHeader from '../components/PageHeader';
import { editUser, getUserInfo } from '../helpers/data/userData';

function Profile({ user, setUser }) {
  const [editing, setEditing] = useState();
  const handleClick = () => {
    setEditing((prevState) => !prevState);
  };
  const [userObject, setUserObject] = useState({});
  useEffect(() => {
    getUserInfo(user.id).then(setUserObject);
  }, []);
  const handleSubmit = () => {
    editUser(userObject, userObject.id).then(setUser);
  };
  const handleInputChange = (e) => {
    setUserObject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{
      color: 'white',
    }}>
      <div className='profile-container' style={{
        height: '95vh',
        width: '60%',
        margin: '25px auto',
        border: '2px solid white',
        fontSize: '24px!important',
      }}>
        <PageHeader headTitle={user.username} fontSize='3em' description={<Image src={user.profileImage} avatar size='small'/>}/>
        <div>
          <StyledHeader inputfontsize='2em'>Bio</StyledHeader>
          <p>{user.bio || 'Nothing here yet!'}</p>
          {editing && <Divider />}
        </div>
        {editing && <Form style={{ width: '50%', margin: 'auto' }} onSubmit={handleSubmit}>
                      <Form.Input label='username' placeholder='Change username...' name='username' value={userObject.username} onChange={handleInputChange}/>
                      <Form.Input label='bio' placeholder='Change username...' control={TextArea} name='bio' value={userObject.bio} onChange={handleInputChange}/>
                      <Form.Input label='profileImage' placeholder='Change username...' name='profileImage' value={userObject.profileImage} onChange={handleInputChange}/>
                      <Button type='submit'>Submit</Button>
                    </Form>}
                    <Button onClick={handleClick} style={{
                      margin: '50px auto',
                    }}>{editing ? 'Close' : 'Edit'}</Button>
      </div>
    </div>
  );
}
Profile.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};
export default Profile;
