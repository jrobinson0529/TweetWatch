import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import loginImage from '../Assets/TweetWatchLoginPicture.png';
import { signInUser } from '../helpers/auth';

function Login({ user }) {
  const history = useHistory();
  const handleClick = () => {
    signInUser();
  };
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, []);
  return (
    <div className='login-page-container'>
      <div className='login-image-container' style={{
        backgroundImage: `url(${loginImage})`,
        backgroundPosition: '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}>
      </div>
    <div className='login-form-container'>
    <div className='header-text-container'>
    <Header as='h3'>Welcome back</Header>
    <Header as='h1'>Sign in to your account</Header>
    </div>
    <Button color='facebook' onClick={handleClick} className='login-btn'>
      <Icon name='google' color='red'/>Sign-in via Google
    </Button>
    </div>
    </div>
  );
}
Login.propTypes = {
  user: PropTypes.any,
};
export default Login;
