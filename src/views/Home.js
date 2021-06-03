import React from 'react';
import PropTypes from 'prop-types';

function Home() {
  return (
    <>
      <h1>Welcome to home</h1>
    </>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
