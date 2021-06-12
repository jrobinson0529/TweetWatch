import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Segment } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';

function Home() {
  return (
  <div>
    <PageHeader headTitle='TweetWatch'/>
    <Container fluid className='home-page-about-container'>
    <Segment circular clearing>
      <Header as='h2'>
        Get Started!
      </Header>
      </Segment>
      <Segment className='home-page-about-content' textAlign='left'>
      <p> <b>Welcome</b> to TweetWatch the sole purpose of this app is to filter the clutter of Twitter and provide you with your desired news, information, and topics as quickly and efficiently as possible.</p>
    <p>
      df
    </p>
      </Segment>
  </Container>
  </div>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
