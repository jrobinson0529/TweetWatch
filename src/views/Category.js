import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import { getCategoryTopics, getSingleCategory } from '../helpers/data/categoryData';
import { getCategoryTweeterInfo, getUserTweetsFiltered } from '../helpers/data/tweeterData';

function Category({ tweets, setTweets }) {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [tweeters, setTweeters] = useState([]);
  useEffect(() => {
    const paramArray = [];
    Promise.all([getSingleCategory(id), getCategoryTweeterInfo(id), getCategoryTopics(id)])
      .then((response) => {
        setCategory(response[0]);
        setTweeters(response[1]);
        response[2].forEach((object) => paramArray.push(...object.searchParams));
        const tweeterUsernames = response[1].map((tweeter) => tweeter.username);
        getUserTweetsFiltered(tweeterUsernames, paramArray).then(setTweets);
      });
  }, [id]);
  const TweeterCard = ({ ...tweeterInfo }) => (
    <Label image size='big'>
        <img src={tweeterInfo.profile_image_url} />
      {tweeterInfo.username}
    { tweeterInfo.verified && <Icon color='blue' name='check circle' style={{ marginLeft: '5px' }}/> }
    <Icon name='delete' />
    </Label>
  );

  return (
    <>
      <PageHeader headTitle={category?.title} description={category?.description}/>
      <Button color='twitter'>
      <Icon name='twitter' /> Add Tweeter
      </Button>
      <Label.Group style={{ margin: '20px' }}>
        {tweeters.length > 0 ? tweeters.map((tweeterInfo) => <TweeterCard key={tweeterInfo.id} {...tweeterInfo} />) : <h3>Add Tweeters to start Tracking!</h3> }
      </Label.Group>
      <Feed tweets={tweets}/>
    </>
  );
}
Category.propTypes = {
  tweets: PropTypes.array,
  setTweets: PropTypes.func,
};

export default Category;
