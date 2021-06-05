import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import StyledHeader from '../components/styled_components/StyledHeader';
import Feed from '../components/Feed';

function Home() {
  return (
  <div>
    <Container textAlign='center' style={{ width: '50%', margin: '5em' }}>
      <StyledHeader as='h1'>TweetWatch</StyledHeader>
      <p className='header-subtext'><i>Nanos gigantium humeris insidentes</i></p>
    </Container>
    <Feed />
  </div>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
