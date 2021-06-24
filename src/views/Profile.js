import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Button, Image, Form, TextArea, Divider
} from 'semantic-ui-react';
import StyledHeader from '../components/styled_components/StyledHeader';
import PageHeader from '../components/PageHeader';
import { editUser, getCurrentUsersUid, getUserInfo } from '../helpers/data/userData';

function Profile({ setUser }) {
  const uid = getCurrentUsersUid();
  const { id } = useParams();
  const [editing, setEditing] = useState();
  const [otherUser, setOtherUser] = useState(true);

  const handleClick = () => {
    setEditing((prevState) => !prevState);
  };
  const [userObject, setUserObject] = useState({});
  useEffect(() => {
    getUserInfo(id).then((response) => {
      setUserObject(response);
      console.warn(response);
      console.warn(uid);
      if (response.uid === uid) {
        setOtherUser(false);
      } else {
        setOtherUser(true);
      }
    });
  }, [id]);
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
        <PageHeader headTitle={userObject.username} fontSize='3em' description={<Image src={userObject.profileImage} avatar size='small'/>}/>
        <div>
          <StyledHeader inputfontsize='2em'>Bio</StyledHeader>
          <p>{userObject.bio || 'Nothing here yet!'}</p>
          {editing && <Divider />}
        </div>
        {editing && <Form style={{ width: '50%', margin: 'auto' }} onSubmit={handleSubmit}>
                      <Form.Input label='username' placeholder='Change username...' name='username' value={userObject.username} onChange={handleInputChange}/>
                      <Form.Input label='bio' placeholder='Change username...' control={TextArea} name='bio' value={userObject.bio} onChange={handleInputChange}/>
                      <Form.Input label='profileImage' placeholder='Change username...' name='profileImage' value={userObject.profileImage} onChange={handleInputChange}/>
                      <Button type='submit'>Submit</Button>
                    </Form>}
                   { otherUser === false && <Button onClick={handleClick} style={{
                     margin: '50px auto',
                   }}>{editing ? 'Close' : 'Edit'}</Button>}
      </div>
    </div>
  );
}
Profile.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};
export default Profile;
