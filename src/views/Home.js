import React from 'react';
import PropTypes from 'prop-types';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';

function Home() {
  return (
  <div>
    <PageHeader headTitle='TweetWatch'/>
    <Feed />
  </div>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
