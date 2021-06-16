import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Button, Form, Icon, Label, Divider, Transition
} from 'semantic-ui-react';
import Feed from '../components/Feed';
import PageHeader from '../components/PageHeader';
import { getSingleCategory } from '../helpers/data/categoryData';
import { getCategoryTopics } from '../helpers/data/topicData';
import { getUserTweetsFiltered } from '../helpers/data/tweeterData';
import { createTweeter, deleteTweeter, getCategoryTweeterInfo } from '../helpers/data/categoryTweeterData';

function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [tweeters, setTweeters] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getSingleCategory(id).then(setCategory);
  }, [id]);

  useEffect(() => {
    const paramArray = [];
    Promise.all([getCategoryTweeterInfo(id), getCategoryTopics(id)])
      .then((response) => {
        setTweeters(response[0]);
        response[1].forEach((object) => paramArray.push(...object.searchParams));
        const tweeterUsernames = response[0].map((tweeterObject) => tweeterObject.username);
        getUserTweetsFiltered(tweeterUsernames, paramArray).then(setTweets);
      });
  }, [id]);

  const TweeterCard = ({ ...tweeterInfo }) => {
    const handleClick = () => {
      console.warn(tweeterInfo.username);
      deleteTweeter(tweeterInfo.username).then(setTweeters);
    };
    return (
    <Label image size='big'>
        <img src={tweeterInfo.profile_image_url} />
      {tweeterInfo.username}
    { tweeterInfo.verified && <Icon color='blue' name='check circle' style={{ marginLeft: '5px' }}/> }
    <Icon name='delete' onClick={handleClick}/>
    </Label>
    );
  };
  const TweeterForm = () => {
    const [visible, setVisible] = useState(false);
    const [tweeter, setTweeter] = useState({
      categoryId: id,
      twitterId: '',
    });
    const toggleForm = () => {
      setVisible((prevState) => !prevState);
    };
    const handleSubmit = () => {
      createTweeter(id, tweeter).then(setTweeters);
    };
    const handleChange = (e) => {
      setTweeter((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };
    return (
    <>
      <Button color='twitter' onClick={toggleForm}>
      <Icon name='twitter' />{visible ? 'Close' : 'Add Tweeter'}
      </Button>
      <Divider hidden />
      <Transition visible={visible} animation='scale' duration={500}>
        <Form onSubmit={handleSubmit} style={{
          width: '25%',
          margin: 'auto'
        }}>
      <Form.Input label='Twitter handle' type='text' name='twitterId' onChange={handleChange}/>
    </Form>
      </Transition>
      </>
    );
  };

  return (
    <>
      <PageHeader headTitle={category?.title} description={category?.description}/>
      <TweeterForm />
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
